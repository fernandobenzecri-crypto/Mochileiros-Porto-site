import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import admin from "firebase-admin";
import Stripe from "stripe";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import firebaseConfig from "./firebase-applet-config.json";
import { 
  sendWelcomeEmail, 
  sendVipConfirmationEmail, 
  sendKitShippingEmail, 
  sendAmbassadorApplicationEmail 
} from "./src/services/emailService.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

declare global {
  namespace Express {
    interface Request {
      user?: admin.auth.DecodedIdToken;
    }
  }
}

const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null;
const JWT_SECRET = process.env.JWT_SECRET || "mochileiros-porto-secret-key";

// Initialize Firebase Admin
admin.initializeApp({
  projectId: firebaseConfig.projectId,
});

const db = admin.firestore();
// If a specific database ID is provided in the config, we should use it.
// However, firebase-admin's firestore() doesn't easily take a databaseId in the same way the client SDK does without more complex setup.
// For now, we'll assume the default database or that the environment handles it.

// Middleware to verify Firebase ID Token
const verifyToken = async (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const idToken = authHeader.split("Bearer ")[1];
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
};

// Middleware to verify Admin
const verifyAdmin = async (req: any, res: any, next: any) => {
  await verifyToken(req, res, async () => {
    const userDoc = await db.collection("users").doc(req.user.uid).get();
    const userData = userDoc.data();
    if (userDoc.exists && userData?.role === 'admin') {
      next();
    } else if (req.user.email === "fernandobenzecri@gmail.com" && req.user.email_verified) {
      next();
    } else {
      res.status(403).json({ error: "Forbidden: Admin access required" });
    }
  });
};

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(cors());

  // API ROUTES
  
  // Auth (Keep for now, but could migrate to Firebase Auth)
  app.post("/api/auth/register", async (req, res) => {
    const { name, email, password, referralCode: refCode } = req.body;
    try {
      const userRef = db.collection("users").where("email", "==", email);
      const snapshot = await userRef.get();
      if (!snapshot.empty) throw new Error("User exists");

      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Generate unique referral code
      const referralCode = Math.random().toString(36).substring(2, 8).toUpperCase();
      
      const newUser: any = {
        name,
        email,
        password: hashedPassword,
        role: 'user',
        is_vip: false,
        mochis: 50, // Initial mochis
        referralCode,
        created_at: admin.firestore.FieldValue.serverTimestamp()
      };

      if (refCode) {
        newUser.referredBy = refCode;
      }
      
      const docRef = await db.collection("users").add(newUser);
      
      // Log initial mochis
      await db.collection("mochi_history").add({
        userId: docRef.id,
        type: 'SIGNUP',
        amount: 50,
        description: 'Bônus de boas-vindas',
        timestamp: admin.firestore.FieldValue.serverTimestamp()
      });

      // Handle Referral Reward for the referrer
      if (refCode) {
        const referrerSnapshot = await db.collection("users").where("referralCode", "==", refCode).limit(1).get();
        if (!referrerSnapshot.empty) {
          const referrerDoc = referrerSnapshot.docs[0];
          const referrerId = referrerDoc.id;
          
          await referrerDoc.ref.update({
            mochis: admin.firestore.FieldValue.increment(100)
          });

          await db.collection("mochi_history").add({
            userId: referrerId,
            type: 'REFERRAL_SIGNUP',
            amount: 100,
            description: `Indicação de ${name}`,
            timestamp: admin.firestore.FieldValue.serverTimestamp()
          });

          await db.collection("referrals").add({
            referrerId,
            referredId: docRef.id,
            type: 'SIGNUP',
            mochisEarned: 200,
            timestamp: admin.firestore.FieldValue.serverTimestamp()
          });
        }
      }
      
      // Send welcome email
      await sendWelcomeEmail(email, name);
      
      const token = jwt.sign({ id: docRef.id, email }, JWT_SECRET);
      res.json({ token, user: { id: docRef.id, name, email, role: 'user', is_vip: false, referralCode } });
    } catch (error: any) {
      res.status(400).json({ error: "Email já cadastrado ou dados inválidos." });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    const { email, password } = req.body;
    const snapshot = await db.collection("users").where("email", "==", email).limit(1).get();
    
    if (snapshot.empty) {
      return res.status(401).json({ error: "Credenciais inválidas." });
    }

    const userDoc = snapshot.docs[0];
    const user = userDoc.data();

    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ id: userDoc.id, email: user.email }, JWT_SECRET);
      res.json({ token, user: { id: userDoc.id, name: user.name, email: user.email, role: user.role, is_vip: !!user.is_vip } });
    } else {
      res.status(401).json({ error: "Credenciais inválidas." });
    }
  });

  // MOCHIS API
  app.post("/api/mochis/award", verifyAdmin, async (req, res) => {
    const { userId, amount, reason, type = 'ADMIN_ADJUST' } = req.body;
    if (!userId || amount === undefined) {
      return res.status(400).json({ error: "userId and amount are required" });
    }

    try {
      const userRef = db.collection("users").doc(userId);
      await userRef.update({
        mochis: admin.firestore.FieldValue.increment(amount),
        points: admin.firestore.FieldValue.increment(amount)
      });

      await db.collection("mochi_history").add({
        userId,
        amount,
        type,
        description: reason || "Ajuste administrativo",
        timestamp: admin.firestore.FieldValue.serverTimestamp()
      });

      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Erro ao atribuir mochis" });
    }
  });

  app.post("/api/mochis/daily-login", verifyToken, async (req, res) => {
    const userId = req.user.uid;
    const today = new Date().toISOString().split('T')[0];
    
    try {
      const userRef = db.collection("users").doc(userId);
      const userDoc = await userRef.get();
      const userData = userDoc.data();

      if (userData?.lastLoginDate === today) {
        return res.json({ success: false, message: "Já recebeu mochis hoje" });
      }

      await userRef.update({
        mochis: admin.firestore.FieldValue.increment(10),
        points: admin.firestore.FieldValue.increment(10),
        lastLoginDate: today,
        monthlyLoginCount: admin.firestore.FieldValue.increment(1)
      });

      await db.collection("mochi_history").add({
        userId,
        amount: 10,
        type: 'DAILY_LOGIN',
        description: 'Login diário',
        timestamp: admin.firestore.FieldValue.serverTimestamp()
      });

      res.json({ success: true, mochis: 10 });
    } catch (error) {
      res.status(500).json({ error: "Erro ao processar login diário" });
    }
  });

  // Stripe Checkout
  app.post("/api/checkout/create-session", async (req, res) => {
    if (!stripe) {
      return res.status(500).json({ error: "Stripe não configurado." });
    }

    const { tripId, tripName, price, userId } = req.body;
    
    try {
      let finalAmount = Math.round(parseFloat(price.replace("€", "").replace(",", ".")) * 100);
      
      // Apply VIP discount if applicable
      if (userId && userId !== "anonymous") {
        const userDoc = await db.collection("users").doc(userId).get();
        const userData = userDoc.data();
        if (userData?.is_vip) {
          finalAmount = Math.round(finalAmount * 0.9); // 10% discount
        }
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "eur",
              product_data: {
                name: tripName,
                description: `Reserva para ${tripName} - Mochileiros Porto`,
              },
              unit_amount: finalAmount,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${req.headers.origin}/sucesso?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/viagens`,
        metadata: {
          tripId,
          userId: userId || "anonymous",
          type: "trip_booking",
          originalPrice: price,
          discountApplied: (userId && userId !== "anonymous") ? "true" : "false"
        },
      });

      // Save pending booking
      await db.collection("bookings").add({
        user_id: userId || null,
        trip_id: tripId,
        trip_name: tripName,
        amount: finalAmount / 100,
        stripe_session_id: session.id,
        status: 'pending',
        created_at: admin.firestore.FieldValue.serverTimestamp()
      });

      res.json({ id: session.id, url: session.url });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // VIP Subscription
  app.post("/api/checkout/create-vip-session", async (req, res) => {
    if (!stripe) {
      return res.status(500).json({ error: "Stripe não configurado." });
    }

    const { userId, email, plan, address } = req.body;

    // Plan configuration
    const plans: Record<string, { name: string, amount: number, interval: "month" | "year", interval_count: number }> = {
      'mochileiro': { name: "VIP Mensal", amount: 790, interval: "month", interval_count: 1 },
      'trimestral': { name: "VIP Trimestral", amount: 2490, interval: "month", interval_count: 3 },
      'semestral': { name: "VIP Semestral", amount: 4490, interval: "month", interval_count: 6 },
      'anual': { name: "Fundador Mochileiros", amount: 9990, interval: "year", interval_count: 1 }
    };

    const selectedPlan = plans[plan] || plans['mochileiro'];

    try {
      // Save address if provided for physical kits
      if (userId && address && userId !== "anonymous") {
        await db.collection("users").doc(userId).update({
          address: address
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "eur",
              product_data: {
                name: selectedPlan.name,
                description: `Assinatura ${selectedPlan.name} - Clube VIP Mochileiros Porto`,
              },
              unit_amount: selectedPlan.amount,
              recurring: {
                interval: selectedPlan.interval,
                interval_count: selectedPlan.interval_count
              },
            },
            quantity: 1,
          },
        ],
        mode: "subscription",
        success_url: `${req.headers.origin}/vip-sucesso?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/clube-vip`,
        customer_email: email,
        client_reference_id: userId,
        metadata: {
          userId,
          planType: plan || 'mochileiro',
          type: "vip_subscription",
        },
      });

      res.json({ id: session.id, url: session.url });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/checkout/verify-vip", async (req, res) => {
    if (!stripe) return res.status(500).json({ error: "Stripe not configured" });
    
    const { sessionId } = req.body;
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['line_items']
      });
      if (session.payment_status === 'paid') {
        const userId = session.metadata?.userId || session.client_reference_id;
        const planType = session.metadata?.planType || "mochileiro";
        
        const planNames: Record<string, string> = {
          'mochileiro': 'VIP Mensal',
          'trimestral': 'VIP Trimestral',
          'semestral': 'VIP Semestral',
          'anual': 'Fundador Mochileiros'
        };
        const planName = planNames[planType] || 'VIP Mensal';
        
        if (userId) {
          const updateData: any = {
            is_vip: true,
            mochis: admin.firestore.FieldValue.increment(500),
            vip_plan: planName,
            plan_type: planType,
            last_payment_status: 'paid'
          };

          if (['trimestral', 'semestral', 'anual'].includes(planType)) {
            updateData.kitStatus = 'pending';
          }

          await db.collection("users").doc(userId).update(updateData);
          
          // Log VIP Mochis
          await db.collection("mochi_history").add({
            userId,
            type: 'VIP_ACTIVATE',
            amount: 500,
            description: `Ativação plano ${planName}`,
            timestamp: admin.firestore.FieldValue.serverTimestamp()
          });

          // Handle Referral Reward for VIP
          const userDoc = await db.collection("users").doc(userId).get();
          const userData = userDoc.data();
          if (userData?.referredBy) {
            const referrerSnapshot = await db.collection("users").where("referralCode", "==", userData.referredBy).limit(1).get();
            if (!referrerSnapshot.empty) {
              const referrerDoc = referrerSnapshot.docs[0];
              await referrerDoc.ref.update({
                mochis: admin.firestore.FieldValue.increment(500)
              });
              await db.collection("mochi_history").add({
                userId: referrerDoc.id,
                type: 'REFERRAL_VIP',
                amount: 500,
                description: `Indicação VIP: ${userData.name}`,
                timestamp: admin.firestore.FieldValue.serverTimestamp()
              });
              await db.collection("referrals").add({
                referrerId: referrerDoc.id,
                referredId: userId,
                type: 'VIP',
                mochisEarned: 500,
                timestamp: admin.firestore.FieldValue.serverTimestamp()
              });
            }
          }

          // Send VIP confirmation email
          if (userData?.email) {
            await sendVipConfirmationEmail(userData.email, userData.name, planName);
          }
          
          return res.json({ success: true, plan: planName });
        }
      }
      res.status(400).json({ error: "Payment not verified" });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Stripe Webhook
  app.post("/api/webhooks/stripe", express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;

    try {
      if (webhookSecret && sig) {
        event = stripe!.webhooks.constructEvent(req.body, sig, webhookSecret);
      } else {
        event = req.body; // Fallback for local testing if secret is not set
      }
    } catch (err: any) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        const userId = session.client_reference_id || session.metadata?.userId;
        const type = session.metadata?.type;

        if (type === 'vip_subscription' && userId) {
          const subscriptionId = session.subscription;
          const customerId = session.customer;
          const planType = session.metadata?.planType || 'mochileiro';

          const planNames: Record<string, string> = {
            'mochileiro': 'VIP Mensal',
            'trimestral': 'VIP Trimestral',
            'semestral': 'VIP Semestral',
            'anual': 'Fundador Mochileiros'
          };
          const vipPlanName = planNames[planType] || 'VIP Mensal';

          const updateData: any = {
            is_vip: true,
            stripe_subscription_id: subscriptionId,
            stripe_customer_id: customerId,
            last_payment_status: 'paid',
            plan_type: planType,
            vip_plan: vipPlanName,
            mochis: admin.firestore.FieldValue.increment(500) // Bonus for VIP
          };

          if (['trimestral', 'semestral', 'anual'].includes(planType)) {
            updateData.kitStatus = 'pending';
          }

          await db.collection("users").doc(userId).update(updateData);
          
          // Log VIP Mochis
          await db.collection("mochi_history").add({
            userId,
            type: 'VIP_ACTIVATE',
            amount: 500,
            description: `Ativação plano ${vipPlanName}`,
            timestamp: admin.firestore.FieldValue.serverTimestamp()
          });

          // Handle Referral Reward for VIP
          const userDoc = await db.collection("users").doc(userId).get();
          const userData = userDoc.data();
          if (userData?.referredBy) {
            const referrerSnapshot = await db.collection("users").where("referralCode", "==", userData.referredBy).limit(1).get();
            if (!referrerSnapshot.empty) {
              const referrerDoc = referrerSnapshot.docs[0];
              await referrerDoc.ref.update({
                mochis: admin.firestore.FieldValue.increment(500)
              });
              await db.collection("mochi_history").add({
                userId: referrerDoc.id,
                type: 'REFERRAL_VIP',
                amount: 500,
                description: `Indicação VIP: ${userData.name}`,
                timestamp: admin.firestore.FieldValue.serverTimestamp()
              });
              await db.collection("referrals").add({
                referrerId: referrerDoc.id,
                referredId: userId,
                type: 'VIP',
                mochisEarned: 500,
                timestamp: admin.firestore.FieldValue.serverTimestamp()
              });
            }
          }

          // Send VIP confirmation email
          if (userData?.email) {
            await sendVipConfirmationEmail(userData.email, userData.name, vipPlanName);
          }
        } else if (type === 'trip_booking') {
          const tripId = session.metadata?.tripId;
          const stripeSessionId = session.id;

          // Update booking status
          const bookingSnapshot = await db.collection("bookings")
            .where("stripe_session_id", "==", stripeSessionId)
            .limit(1)
            .get();

          if (!bookingSnapshot.empty) {
            const bookingDoc = bookingSnapshot.docs[0];
            await bookingDoc.ref.update({
              status: 'confirmed',
              confirmed_at: admin.firestore.FieldValue.serverTimestamp()
            });

            // Reward user with mochis
            if (userId && userId !== 'anonymous') {
              await db.collection("users").doc(userId).update({
                mochis: admin.firestore.FieldValue.increment(100)
              });

              await db.collection("mochi_history").add({
                userId,
                type: 'TRIP_BOOKING',
                amount: 100,
                description: `Reserva de viagem: ${bookingDoc.data().trip_name}`,
                timestamp: admin.firestore.FieldValue.serverTimestamp()
              });

              // Handle Referral Reward for Trip
              const userDoc = await db.collection("users").doc(userId).get();
              const userData = userDoc.data();
              if (userData?.referredBy) {
                const referrerSnapshot = await db.collection("users").where("referralCode", "==", userData.referredBy).limit(1).get();
                if (!referrerSnapshot.empty) {
                  const referrerDoc = referrerSnapshot.docs[0];
                  await referrerDoc.ref.update({
                    mochis: admin.firestore.FieldValue.increment(200)
                  });
                  await db.collection("mochi_history").add({
                    userId: referrerDoc.id,
                    type: 'REFERRAL_TRIP',
                    amount: 200,
                    description: `Indicação Viagem: ${userData.name}`,
                    timestamp: admin.firestore.FieldValue.serverTimestamp()
                  });
                  await db.collection("referrals").add({
                    referrerId: referrerDoc.id,
                    referredId: userId,
                    type: 'TRIP',
                    mochisEarned: 200,
                    timestamp: admin.firestore.FieldValue.serverTimestamp()
                  });
                }
              }
            }
          }
        }
        break;
      }
      case 'invoice.paid': {
        const invoice = event.data.object;
        const subscriptionId = invoice.subscription;

        // Award mochis on every successful payment (renewal)
        const userSnapshot = await db.collection("users")
          .where("stripe_subscription_id", "==", subscriptionId)
          .limit(1)
          .get();

        if (!userSnapshot.empty) {
          const userDoc = userSnapshot.docs[0];
          const userData = userDoc.data();
          const isAnnual = invoice.lines.data.some((line: any) => line.plan?.interval === 'year');
          const amount = isAnnual ? 300 : 100;

          await userDoc.ref.update({
            mochis: admin.firestore.FieldValue.increment(amount),
            last_payment_status: 'paid'
          });

          await db.collection("mochi_history").add({
            userId: userDoc.id,
            type: isAnnual ? 'VIP_RENEW_ANNUAL' : 'VIP_RENEW_MONTHLY',
            amount,
            description: `Renovação VIP ${isAnnual ? 'Anual' : 'Mensal'}`,
            timestamp: admin.firestore.FieldValue.serverTimestamp()
          });
        }
        break;
      }
      case 'invoice.payment_failed': {
        const invoice = event.data.object;
        const subscriptionId = invoice.subscription;

        // Find user by subscription ID and block access
        const userSnapshot = await db.collection("users")
          .where("stripe_subscription_id", "==", subscriptionId)
          .limit(1)
          .get();

        if (!userSnapshot.empty) {
          const userDoc = userSnapshot.docs[0];
          await userDoc.ref.update({
            is_vip: false,
            last_payment_status: 'failed'
          });
        }
        break;
      }
      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        const subscriptionId = subscription.id;

        const userSnapshot = await db.collection("users")
          .where("stripe_subscription_id", "==", subscriptionId)
          .limit(1)
          .get();

        if (!userSnapshot.empty) {
          const userDoc = userSnapshot.docs[0];
          await userDoc.ref.update({
            is_vip: false,
            last_payment_status: 'canceled'
          });
        }
        break;
      }
    }

    res.json({ received: true });
  });

  // Customer Portal
  app.post("/api/checkout/create-portal-session", async (req, res) => {
    if (!stripe) return res.status(500).json({ error: "Stripe not configured" });

    const { userId } = req.body;
    try {
      const userDoc = await db.collection("users").doc(userId).get();
      const userData = userDoc.data();

      if (!userData?.stripe_customer_id) {
        return res.status(400).json({ error: "Nenhuma assinatura ativa encontrada para este usuário." });
      }

      const session = await stripe.billingPortal.sessions.create({
        customer: userData.stripe_customer_id,
        return_url: `${req.headers.origin}/membro`,
      });

      res.json({ url: session.url });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Ambassador Application
  app.post("/api/ambassador/apply", async (req, res) => {
    const { formData, userId } = req.body;
    try {
      await db.collection("candidaturas_embaixador").add({
        ...formData,
        userId: userId || null,
        status: "pendente",
        created_at: admin.firestore.FieldValue.serverTimestamp()
      });
      
      // Send confirmation email to applicant
      if (formData.email) {
        await sendAmbassadorApplicationEmail(formData.email, formData.name);
      }
      
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Admin: Approve Ambassador
  app.post("/api/admin/approve-ambassador", async (req, res) => {
    const { appId, userId, name } = req.body;
    try {
      // 1. Update user profile
      const userSnapshot = await db.collection("users").get();
      const embaixadoresCount = userSnapshot.docs.filter(d => d.data().tipoMembro === 'embaixador').length;

      await db.collection("users").doc(userId).update({
        tipoMembro: 'embaixador',
        is_vip: true,
        plan_type: 'embaixador_gratis',
        vip_plan: 'Embaixador MP',
        points: 500,
        metaAtual: 'basica',
        indicacoesConfirmadas: 0,
        membrosAcompanhados: 0,
        ranking_position: embaixadoresCount + 1
      });

      // 2. Update application status
      await db.collection("candidaturas_embaixador").doc(appId).update({
        status: 'aprovado',
        approved_at: admin.firestore.FieldValue.serverTimestamp()
      });

      // 3. Send VIP confirmation email (as they get free VIP)
      const userDoc = await db.collection("users").doc(userId).get();
      const userData = userDoc.data();
      if (userData?.email) {
        await sendVipConfirmationEmail(userData.email, userData.name, 'Embaixador MP');
      }

      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Admin: Mark Kit as Shipped
  app.post("/api/admin/mark-kit-shipped", async (req, res) => {
    const { userId } = req.body;
    try {
      await db.collection("users").doc(userId).update({
        kitStatus: 'shipped',
        kitShippedAt: admin.firestore.FieldValue.serverTimestamp()
      });

      // Send kit shipping email
      const userDoc = await db.collection("users").doc(userId).get();
      const userData = userDoc.data();
      if (userData?.email) {
        await sendKitShippingEmail(userData.email, userData.name);
      }

      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Gamification Endpoints
  app.post("/api/gamification/daily-login", async (req, res) => {
    const { userId } = req.body;
    const today = new Date().toISOString().split('T')[0];
    
    try {
      const userRef = db.collection("users").doc(userId);
      const userDoc = await userRef.get();
      const userData = userDoc.data();

      if (!userData) return res.status(404).json({ error: "User not found" });

      if (userData.lastLoginDate === today) {
        return res.json({ success: false, message: "Já logou hoje" });
      }

      const monthlyLoginCount = (userData.monthlyLoginCount || 0) + 1;
      
      if (monthlyLoginCount > 100) {
        return res.json({ success: false, message: "Limite mensal de logins atingido" });
      }

      await userRef.update({
        lastLoginDate: today,
        monthlyLoginCount,
        mochis: admin.firestore.FieldValue.increment(10)
      });

      await db.collection("mochi_history").add({
        userId,
        type: 'DAILY_LOGIN',
        amount: 10,
        description: 'Primeiro login do dia',
        timestamp: admin.firestore.FieldValue.serverTimestamp()
      });

      res.json({ success: true, mochis: 10 });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/gamification/share-link", async (req, res) => {
    const { userId } = req.body;
    
    try {
      const userRef = db.collection("users").doc(userId);
      const userDoc = await userRef.get();
      const userData = userDoc.data();

      if (!userData) return res.status(404).json({ error: "User not found" });

      const monthlyShareCount = (userData.monthlyShareCount || 0) + 1;
      
      if (monthlyShareCount > 10) {
        return res.json({ success: false, message: "Limite mensal de compartilhamentos atingido" });
      }

      await userRef.update({
        monthlyShareCount,
        mochis: admin.firestore.FieldValue.increment(10)
      });

      await db.collection("mochi_history").add({
        userId,
        type: 'SHARE_LINK',
        amount: 10,
        description: 'Compartilhamento de link de indicação',
        timestamp: admin.firestore.FieldValue.serverTimestamp()
      });

      res.json({ success: true, mochis: 10 });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/gamification/reward-referral", async (req, res) => {
    const { referrerCode, referredId, referredName } = req.body;
    
    try {
      const referrerSnapshot = await db.collection("users").where("referralCode", "==", referrerCode).limit(1).get();
      if (referrerSnapshot.empty) {
        return res.status(404).json({ error: "Referrer not found" });
      }

      const referrerDoc = referrerSnapshot.docs[0];
      const referrerId = referrerDoc.id;

      await referrerDoc.ref.update({
        mochis: admin.firestore.FieldValue.increment(200)
      });

      await db.collection("mochi_history").add({
        userId: referrerId,
        type: 'REFERRAL_SIGNUP',
        amount: 200,
        description: `Indicação de ${referredName}`,
        timestamp: admin.firestore.FieldValue.serverTimestamp()
      });

      await db.collection("referrals").add({
        referrerId,
        referredId,
        type: 'SIGNUP',
        mochisEarned: 200,
        timestamp: admin.firestore.FieldValue.serverTimestamp()
      });

      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // VITE MIDDLEWARE
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();


