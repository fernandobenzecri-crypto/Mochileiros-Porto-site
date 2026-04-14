import { GoogleGenAI, Type } from "@google/genai";

let aiInstance: GoogleGenAI | null = null;

const getAI = () => {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is required');
    }
    aiInstance = new GoogleGenAI({ apiKey });
  }
  return aiInstance;
};

export interface AdminAction {
  type: 'UPDATE_USER' | 'ADD_MOCHIS' | 'SET_VIP' | 'SET_LEVEL' | 'SET_PLAN' | 'UNKNOWN';
  targetUserId?: string;
  value?: any;
  reasoning: string;
}

export async function parseAdminCommand(command: string, usersContext: any[]): Promise<AdminAction> {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [{
      parts: [{
        text: `Você é o assistente administrativo do site "Mochileiros Porto".
    Sua tarefa é interpretar comandos em linguagem natural e transformá-los em ações estruturadas para gerenciar os membros da comunidade.
    
    COMANDO DO ADMIN: "${command}"
    
    LISTA DE USUÁRIOS DISPONÍVEIS:
    ${JSON.stringify(usersContext.map(u => ({ id: u.uid, name: u.name, email: u.email })))}
    
    REGRAS:
    1. Identifique o usuário alvo pelo nome ou e-mail.
    2. Identifique a ação:
       - SET_PLAN: Mudar o plano do usuário. Valores possíveis: "explorador", "mochileiro", "embaixador".
       - SET_VIP: Ativar ou desativar status VIP (atalho para SET_PLAN "mochileiro" ou "explorador").
       - ADD_MOCHIS: Adicionar ou subtrair mochis (pontos).
       - SET_LEVEL: Mudar o nível do usuário (ex: "Explorador", "Guia", "Lenda").
    3. Se não entender o comando ou não encontrar o usuário, retorne type "UNKNOWN".
    
    RETORNE APENAS O JSON NO FORMATO:
    {
      "type": "SET_PLAN" | "ADD_MOCHIS" | "SET_LEVEL" | "UNKNOWN",
      "targetUserId": "id_do_usuario",
      "value": valor_da_acao (string para PLAN/LEVEL, number para Mochis),
      "reasoning": "Explicação curta do que você entendeu"
    }`
      }]
    }],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          type: { type: Type.STRING },
          targetUserId: { type: Type.STRING },
          value: { type: Type.STRING },
          reasoning: { type: Type.STRING }
        },
        required: ["type", "reasoning"]
      }
    }
  });

  const result = JSON.parse(response.text);
  
  // Convert value to correct type based on action type
  if (result.type === 'SET_VIP') {
    result.type = 'SET_PLAN';
    result.value = (result.value === 'true' || result.value === true) ? 'mochileiro' : 'explorador';
  }
  if (result.type === 'ADD_MOCHIS') result.value = Number(result.value);
  
  return result as AdminAction;
}
