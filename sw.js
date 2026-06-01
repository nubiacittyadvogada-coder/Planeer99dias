
// SERVICE WORKER para notificações push
const MENSAGENS_MANHA = [
  "Bom dia. Antes do celular, antes do Instagram. Deus primeiro.",
  "A frequência muda quando o corpo se move. Começa agora.",
  "Hoje é mais um dia de decisão. Não de motivação.",
  "Se der medo, vai com medo mesmo. Seja forte e corajosa.",
  "A mulher da sua visão já está acordada. E você?",
  "Cada manhã é o Dia 1 de algo que importa. Usa bem.",
  "Você não precisa de disposição. Precisa de decisão.",
];

const MENSAGENS_ACADEMIA = [
  "💪 Hora da academia. Sem negociação com ninguém, incluindo você mesma.",
  "💪 O corpo parado é frequência baixa. Se move agora.",
  "💪 Academia hoje. Não quando der. Agora.",
  "💪 A versão que você quer ser já está na academia. Vai.",
];

const MENSAGENS_NOITE = [
  "🌙 3 minutos antes de dormir. Fecha os olhos. Vê a sua visão.",
  "🌙 Como você operou hoje? Medo ou fé? Registra no planner.",
  "🌙 Amanhã começa agora. Termina o dia com intenção.",
  "🌙 Você foi corajosa hoje? Anota antes de dormir.",
];

const MENSAGENS_RETORNO = [
  "Você está aqui. Isso é tudo que importa. Vai com medo mesmo.",
  "Sem culpa, sem drama. Continua de onde parou. A frequência se reconstrói.",
  "Feito imperfeito vale mais que perfeito na gaveta. Abre o planner.",
  "Você não está construindo algo novo. Está voltando para quem sempre foi.",
];

self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(clients.claim()));

self.addEventListener('push', e => {
  const data = e.data ? e.data.json() : {};
  e.waitUntil(
    self.registration.showNotification(data.title || 'Planner 99 Dias', {
      body: data.body || 'Abra seu planner.',
      icon: '/icon.png',
      badge: '/icon.png',
      vibrate: [200, 100, 200],
      data: { url: data.url || '/' },
      actions: [
        { action: 'abrir', title: 'Abrir planner' },
        { action: 'depois', title: 'Depois' }
      ]
    })
  );
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  if (e.action !== 'depois') {
    e.waitUntil(clients.openWindow('/'));
  }
});
