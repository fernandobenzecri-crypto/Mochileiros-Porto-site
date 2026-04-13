import { Resend } from 'resend';
import { BRAND } from '../constants';

let resendInstance: Resend | null = null;

const getResend = () => {
  if (!resendInstance && process.env.RESEND_API_KEY) {
    resendInstance = new Resend(process.env.RESEND_API_KEY);
  }
  return resendInstance;
};

const FROM_EMAIL = 'Mochileiros Porto <onboarding@resend.dev>'; // Default Resend domain for testing, should be updated to custom domain in production

export const sendWelcomeEmail = async (to: string, name: string) => {
  const resend = getResend();
  if (!resend) return console.warn('Resend API Key not configured. Welcome email not sent.');
  
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: `Bem-vindo à Família, ${name}! 🎒`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h1 style="color: #003366;">Bem-vindo ao Porto!</h1>
          <p>Olá, <strong>${name}</strong>,</p>
          <p>É uma alegria imensa ter você conosco. O Mochileiros Porto não é apenas uma comunidade, é o seu porto seguro aqui em Portugal.</p>
          <p><strong>O que você pode fazer agora?</strong></p>
          <ul>
            <li>Explorar nossas <a href="https://mochileirosporto.com/viagens">próximas excursões</a>.</li>
            <li>Entrar no nosso <a href="${BRAND.whatsappLink}">grupo do WhatsApp</a>.</li>
            <li>Conhecer os benefícios do <a href="https://mochileirosporto.com/clube-vip">Clube VIP</a>.</li>
          </ul>
          <p>Nos vemos em breve em alguma estrada por aí!</p>
          <hr />
          <p style="font-size: 12px; color: #666;">${BRAND.name} - ${BRAND.tagline}</p>
        </div>
      `
    });
    console.log(`Welcome email sent to ${to}`);
  } catch (error) {
    console.error('Error sending welcome email:', error);
  }
};

export const sendVipConfirmationEmail = async (to: string, name: string, plan: string) => {
  const resend = getResend();
  if (!resend) return console.warn('Resend API Key not configured. VIP email not sent.');

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: `👑 Você agora é VIP: ${plan}!`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; background-color: #fff9f0;">
          <h1 style="color: #e67e22;">Parabéns, ${name}!</h1>
          <p>Sua assinatura do plano <strong>${plan}</strong> foi confirmada com sucesso.</p>
          <p><strong>Seus novos super-poderes:</strong></p>
          <ul>
            <li>Desconto de 10% em todas as excursões.</li>
            <li>Acesso imediato aos Tutoriais VIP (Impostos, Negócios, Vistos).</li>
            <li>500 Mochis de bônus creditados na sua conta.</li>
            <li>Prioridade na reserva de vagas.</li>
          </ul>
          <p>Acesse seu <a href="https://mochileirosporto.com/membro">Painel de Membro</a> para ver sua Carta de Membro Digital.</p>
          <hr />
          <p style="font-size: 12px; color: #666;">${BRAND.name} - O Clube VIP dos Imigrantes no Porto</p>
        </div>
      `
    });
    console.log(`VIP confirmation email sent to ${to}`);
  } catch (error) {
    console.error('Error sending VIP confirmation email:', error);
  }
};

export const sendKitShippingEmail = async (to: string, name: string) => {
  const resend = getResend();
  if (!resend) return console.warn('Resend API Key not configured. Kit email not sent.');

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: `📦 Seu Kit Mochileiro está a caminho!`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h1 style="color: #27ae60;">Prepara a mochila!</h1>
          <p>Olá, <strong>${name}</strong>,</p>
          <p>Temos boas notícias: seu Kit Físico (Camiseta + Ecobag + Mimos) já foi processado e está saindo para entrega.</p>
          <p>Em breve você estará devidamente uniformizado para nossas próximas aventuras.</p>
          <p>Se tiver qualquer dúvida sobre a entrega, responda a este e-mail.</p>
          <hr />
          <p style="font-size: 12px; color: #666;">${BRAND.name} - ${BRAND.tagline}</p>
        </div>
      `
    });
    console.log(`Kit shipping email sent to ${to}`);
  } catch (error) {
    console.error('Error sending kit shipping email:', error);
  }
};

export const sendAmbassadorApplicationEmail = async (to: string, name: string) => {
  const resend = getResend();
  if (!resend) return console.warn('Resend API Key not configured. Ambassador email not sent.');

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: `🏅 Recebemos sua candidatura, ${name}!`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; background-color: #f4f7f6;">
          <h1 style="color: #2c3e50;">Candidatura a Embaixador</h1>
          <p>Olá, <strong>${name}</strong>,</p>
          <p>Obrigado por querer ajudar a nossa comunidade a crescer. Recebemos sua candidatura para o programa de Embaixadores.</p>
          <p><strong>Próximos passos:</strong></p>
          <ol>
            <li>Nossa equipe vai analisar seu perfil e motivação.</li>
            <li>Entraremos em contato via WhatsApp ou e-mail em até 48 horas.</li>
            <li>Se aprovado, agendaremos uma conversa rápida para alinhar expectativas.</li>
          </ol>
          <p>Estamos ansiosos para conversar com você!</p>
          <hr />
          <p style="font-size: 12px; color: #666;">${BRAND.name} - Liderança e Comunidade</p>
        </div>
      `
    });
    console.log(`Ambassador application email sent to ${to}`);
  } catch (error) {
    console.error('Error sending ambassador application email:', error);
  }
};
