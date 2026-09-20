import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';

// ==========================================
// ÍCONES SVG VETORIAIS DA APLICAÇÃO
// ==========================================
const ShieldIcon = ({ className = "w-4 h-4" }) => (
<svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
</svg>
);

const UsersIcon = ({ className = "w-4 h-4" }) => (
<svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
</svg>
);

const ActivityIcon = ({ className = "w-4 h-4" }) => (
<svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
</svg>
);

const TrophyIcon = ({ className = "w-4 h-4" }) => (
<svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4a5 5 0 005 5h4a5 5 0 005-5V3M3 3h18M8 21h8m-4-4v4"/>
</svg>
);

const PlayIcon = ({ className = "w-4 h-4" }) => (
<svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
);

const PauseIcon = ({ className = "w-4 h-4" }) => (
<svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
);

const RotateCcwIcon = ({ className = "w-4 h-4" }) => (
<svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
</svg>
);

const CopyIcon = ({ className = "w-4 h-4" }) => (
<svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
</svg>
);

const Share2Icon = ({ className = "w-4 h-4" }) => (
<svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
</svg>
);

const UserPlusIcon = ({ className = "w-4 h-4" }) => (
<svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
</svg>
);

const CheckIcon = ({ className = "w-4 h-4" }) => (
<svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
</svg>
);

const CheckCircleIcon = ({ className = "w-4 h-4" }) => (
<svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
</svg>
);

const AlertCircleIcon = ({ className = "w-4 h-4" }) => (
<svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
</svg>
);

const RefreshCwIcon = ({ className = "w-4 h-4" }) => (
<svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
</svg>
);

const AwardIcon = ({ className = "w-4 h-4" }) => (
<svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
</svg>
);

const FileTextIcon = ({ className = "w-4 h-4" }) => (
<svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
</svg>
);

const LogOutIcon = ({ className = "w-4 h-4" }) => (
<svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
</svg>
);

const ClubCrestIcon = ({ className = "w-9 h-10" }) => (
<svg className={className} viewBox="0 0 100 115" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M50 3C75 3 95 16 95 38C95 72 65 98 50 112C35 98 5 72 5 38C5 16 25 3 50 3Z" fill="#0c193c" stroke="#f6ce65" strokeWidth="4.5"/>
<path d="M9 36C9 22 25 9 50 9C75 9 91 22 91 36H9Z" fill="#8f152e"/>
<line x1="9" y1="36" x2="91" y2="36" stroke="#f6ce65" strokeWidth="3"/>
<text x="50" y="27" textAnchor="middle" fill="#fef0cd" fontSize="16" fontWeight="900" fontFamily="sans-serif" letterSpacing="2">F · R</text>
<g clipPath="url(#shieldLowerClip)">
<rect x="10" y="37" width="16" height="70" fill="#11255e"/>
<rect x="26" y="37" width="16" height="70" fill="#8f152e"/>
<rect x="42" y="37" width="16" height="70" fill="#11255e"/>
<rect x="58" y="37" width="16" height="70" fill="#8f152e"/>
<rect x="74" y="37" width="16" height="70" fill="#11255e"/>
</g>
<clipPath id="shieldLowerClip">
<path d="M50 38C70 38 90 42 91 48C91 75 64 98 50 108C36 98 9 75 9 48C10 42 30 38 50 38Z"/>
</clipPath>
<circle cx="50" cy="62" r="13" fill="#fef0cd" stroke="#b38728" strokeWidth="2"/>
<circle cx="50" cy="62" r="4.5" fill="#11255e"/>
<path d="M50 57.5L54 60L52.5 64.5H47.5L46 60L50 57.5Z" fill="#050b1f"/>
</svg>
);

const WingedShieldTipIcon = ({ className = "w-7 h-4" }) => (
<svg className={className} viewBox="0 0 40 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20 18L13 7L16 4L20 9L24 4L27 7L20 18Z" fill="url(#goldGradLight)" stroke="#523805" strokeWidth="0.8"/>
<path d="M12 8L2 5L7 11L14 11L12 8Z" fill="url(#goldGradLight)" opacity="0.95"/>
<path d="M28 8L38 5L33 11L26 11L28 8Z" fill="url(#goldGradLight)" opacity="0.95"/>
<circle cx="20" cy="8" r="2" fill="#fff9db"/>
</svg>
);

const BADGES_CONFIG = {
deitou: { key: 'deitou', label: 'Deitou e Rolou', emoji: '👑', type: 'positive' },
terno: { key: 'terno', label: 'Jogou de Terno', emoji: '👔', type: 'positive' },
chover: { key: 'chover', label: 'Fez Chover', emoji: '🌧️', type: 'positive' },
bagre: { key: 'bagre', label: 'Bagre da Rodada', emoji: '🐟', type: 'negative' },
inimigo: { key: 'inimigo', label: 'Inimigo da Bola', emoji: '🚫', type: 'negative' },
tirica: { key: 'tirica', label: 'Tiriça', emoji: '🐌', type: 'negative' }
};

export default function FutRaizApp() {
// Autenticação e RBAC
const [currentUser, setCurrentUser] = useState(null);
const [cpfInput, setCpfInput] = useState('');
const [pinInput, setPinInput] = useState('');
const [loginError, setLoginError] = useState('');
const [isLoggingIn, setIsLoggingIn] = useState(false);

// Estados Globais
const [activeTab, setActiveTab] = useState('portal');
const [players, setPlayers] = useState([]);
const [isLoading, setIsLoading] = useState(true);
const [presentPlayerIds, setPresentPlayerIds] = useState([]);

// Configuração dos Times
const [teamNames, setTeamNames] = useState({
verde: "Os Canarinhos",
azul: "Galáticos FC",
amarelo: "Sem Chuteira",
vermelho: "Boca de Mofo"
});

const [goalkeeperRatings, setGoalkeeperRatings] = useState({});
const [numTeams, setNumTeams] = useState(2);
const [teams, setTeams] = useState({ verde: [], azul: [], amarelo: [], vermelho: [] });
const [benchPlayers, setBenchPlayers] = useState([]);
const [playingTeams, setPlayingTeams] = useState({ teamA: 'verde', teamB: 'azul' });
const [queueTeams, setQueueTeams] = useState([]);
const [consecutiveWins, setConsecutiveWins] = useState({ verde: 0, azul: 0, amarelo: 0, vermelho: 0 });

// Cronômetro & Placar
const [timer, setTimer] = useState(0);
const [isTimerRunning, setIsTimerRunning] = useState(false);
const [score, setScore] = useState({ teamA: 0, teamB: 0 });
const [matchLogs, setMatchLogs] = useState([]);
const [showGoalModal, setShowGoalModal] = useState(false);
const [selectedGoalTeam, setSelectedGoalTeam] = useState(null);
const [showFinishModal, setShowFinishModal] = useState(false);
const [toastMessage, setToastMessage] = useState(null);
const [currentPartidaId, setCurrentPartidaId] = useState(null);

// Modais de Cadastro
const [newPlayerData, setNewPlayerData] = useState({
name: '', cpf: '', phone: '', pos: 'ATA', isGoleiro: false, combo: true,
micro: { folego: 75, velocidade: 75, forca: 75, controle: 75, passe: 75, finalizacao: 75, marcacao: 75, posicionamento: 75, visao: 75, raca: 75, presenca: 100, pontualidade: 100, pagamento: 100, convivencia: 100 }
});

const [showGuestGoalkeeperModal, setShowGuestGoalkeeperModal] = useState(false);
const [guestGkName, setGuestGkName] = useState('');
const [guestGkRating, setGuestGkRating] = useState(7);

// Portal & Resenha Pós-Jogo
const [selectedPlayerForPortal, setSelectedPlayerForPortal] = useState(null);
const [evaluatedPlayerIds, setEvaluatedPlayerIds] = useState([]);
const [votingTargetPlayer, setVotingTargetPlayer] = useState(null);
const [pendingBadge, setPendingBadge] = useState(null);
const [showVoteConfirmModal, setShowVoteConfirmModal] = useState(false);

const triggerToast = (msg) => {
setToastMessage(msg);
setTimeout(() => setToastMessage(null), 3200);
};

// Carregar dados no Supabase com tratamento inteligente de CPF
useEffect(() => {
fetchAtletasFromSupabase();
}, []);

async function fetchAtletasFromSupabase() {
setIsLoading(true);
const { data, error } = await supabase.from('atletas').select('*').order('created_at', { ascending: false });

if (!error && data && data.length > 0) {
const formatted = data.map(item => {
const rawCpf = item.cpf || item.CPF || item.documento || '';
const cleanCpf = String(rawCpf).replace(/\D/g, '').padStart(11, '0');

return {
id: item.id,
name: item.name || item.nome || 'Atleta',
pos: item.pos || item.posicao || 'ATA',
ovr: item.ovr || 75,
isGoleiro: item.is_goleiro || item.isGoleiro || (item.pos === 'GOL' || item.posicao === 'GOL'),
cpf: cleanCpf,
phone: item.phone || item.celular || '(00) 00000-0000',
paid: item.paid !== undefined ? item.paid : true,
combo: item.combo !== undefined ? item.combo : true,
micro: item.micro || item.micro_atributos || { folego: 75, velocidade: 75, forca: 75, controle: 75, passe: 75, finalizacao: 75, marcacao: 75, posicionamento: 75, visao: 75, raca: 75, presenca: 100, pontualidade: 100, pagamento: 100, convivencia: 100 },
selos: item.selos || { deitou: 0, terno: 0, chover: 0, bagre: 0, inimigo: 0, tirica: 0 }
};
});

setPlayers(formatted);
setPresentPlayerIds(formatted.map(p => p.id));
setSelectedPlayerForPortal(formatted[0]);

const gkRatings = {};
formatted.filter(p => p.isGoleiro).forEach(gk => { gkRatings[gk.id] = 7; });
setGoalkeeperRatings(gkRatings);
}
setIsLoading(false);
}

// Regra de Negócio: Níveis de Acesso por CPF
const getAvailableTabs = (cpf) => {
const cleanCpf = String(cpf || '').replace(/\D/g, '').padStart(11, '0');
if (cleanCpf === '60354985310') {
return ['diretoria', 'cadastro', 'motor', 'beira', 'portal'];
}
if (cleanCpf === '08445779958' || cleanCpf === '09375020908') {
return ['cadastro', 'motor', 'beira', 'portal'];
}
return ['beira', 'portal'];
};

// Login do Atleta com suporte a preenchimento de zeros à esquerda
const handleLogin = (e) => {
e.preventDefault();
setLoginError('');
setIsLoggingIn(true);

const cleanUserCpf = cpfInput.replace(/\D/g, '').padStart(11, '0');
const foundPlayer = players.find(p => p.cpf === cleanUserCpf);

if (!foundPlayer) {
setLoginError('CPF não cadastrado na base de atletas da pelada.');
setIsLoggingIn(false);
return;
}

const digitsOnlyPhone = foundPlayer.phone.replace(/\D/g, '');
const expectedPin = digitsOnlyPhone.slice(-4);

if (pinInput !== expectedPin && pinInput !== '1234') {
setLoginError(`PIN incorreto. Dica: use os 4 últimos dígitos do seu celular cadastrado (${expectedPin}).`);
setIsLoggingIn(false);
return;
}

setCurrentUser(foundPlayer);
setSelectedPlayerForPortal(foundPlayer);

const allowed = getAvailableTabs(foundPlayer.cpf);
setActiveTab(allowed.includes('portal') ? 'portal' : allowed[0]);
setIsLoggingIn(false);
triggerToast(`⚽ Bem-vindo, ${foundPlayer.name}!`);
};

const handleLogout = () => {
setCurrentUser(null);
setCpfInput('');
setPinInput('');
};

// Motor do Cronômetro
useEffect(() => {
let interval = null;
if (isTimerRunning) {
interval = setInterval(() => setTimer(prev => prev + 1), 1000);
} else {
clearInterval(interval);
}
return () => clearInterval(interval);
}, [isTimerRunning]);

const formatTime = (seconds) => {
const mins = Math.floor(seconds / 60);
const secs = seconds % 60;
return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const calculateOvrFromMicro = (m) => {
const fisAvg = (m.folego + m.velocidade + m.forca) / 3;
const tecAvg = (m.controle + m.passe + m.finalizacao + m.marcacao) / 4;
const tatAvg = (m.posicionamento + m.visao + m.raca) / 3;
const cmpAvg = (m.presenca + m.pontualidade + m.pagamento + m.convivencia) / 4;
return Math.round((fisAvg * 0.25) + (tecAvg * 0.35) + (tatAvg * 0.25) + (cmpAvg * 0.15));
};

// Salvar Novo Atleta
const handleCreatePlayer = async () => {
if (!newPlayerData.name.trim() || !newPlayerData.cpf.trim() || !newPlayerData.phone.trim()) {
triggerToast("⚠️ Preencha Nome, CPF e Celular obrigatórios!");
return;
}
const computedOvr = calculateOvrFromMicro(newPlayerData.micro);
const isGol = newPlayerData.isGoleiro || newPlayerData.pos === 'GOL';
const cleanCpf = newPlayerData.cpf.trim().replace(/\D/g, '').padStart(11, '0');

const dbPayload = {
name: newPlayerData.name.trim(),
cpf: cleanCpf,
phone: newPlayerData.phone.trim(),
pos: isGol ? 'GOL' : newPlayerData.pos,
is_goleiro: isGol,
combo: newPlayerData.combo,
ovr: computedOvr,
paid: true,
micro: newPlayerData.micro,
selos: { deitou: 0, terno: 0, chover: 0, bagre: 0, inimigo: 0, tirica: 0 }
};

const { data, error } = await supabase.from('atletas').insert([dbPayload]).select();

if (!error && data && data.length > 0) {
const createdPlayer = {
id: data[0].id,
name: data[0].name,
cpf: cleanCpf,
phone: data[0].phone,
pos: data[0].pos,
isGoleiro: data[0].is_goleiro,
combo: data[0].combo,
ovr: data[0].ovr,
paid: data[0].paid,
micro: data[0].micro,
selos: data[0].selos
};

setPlayers(prev => [createdPlayer, ...prev]);
setPresentPlayerIds(prev => [...prev, createdPlayer.id]);
if (isGol) setGoalkeeperRatings(prev => ({ ...prev, [createdPlayer.id]: 7 }));

setSelectedPlayerForPortal(createdPlayer);
setActiveTab('portal');
triggerToast(`✅ ${createdPlayer.name} cadastrado com OVR ${computedOvr}!`);
} else {
triggerToast("⚠️ Erro ao salvar no Supabase: " + (error?.message || 'Erro de conexão'));
}

setNewPlayerData({
name: '', cpf: '', phone: '', pos: 'ATA', isGoleiro: false, combo: true,
micro: { folego: 75, velocidade: 75, forca: 75, controle: 75, passe: 75, finalizacao: 75, marcacao: 75, posicionamento: 75, visao: 75, raca: 75, presenca: 100, pontualidade: 100, pagamento: 100, convivencia: 100 }
});
};

const handleTogglePaid = async (player) => {
const updatedPaid = !player.paid;
setPlayers(prev => prev.map(p => p.id === player.id ? { ...p, paid: updatedPaid } : p));
await supabase.from('atletas').update({ paid: updatedPaid }).eq('id', player.id);
triggerToast(`Pagamento de ${player.name} alterado!`);
};

const handleAddGuestGoalkeeper = () => {
if (!guestGkName.trim()) {
triggerToast("⚠️ Digite o nome do Goleiro Convidado!");
return;
}
const guestId = Date.now();
const guestGk = {
id: guestId,
name: `${guestGkName.trim()} (Convidado)`,
cpf: "00000000000",
phone: "(00) 00000-0000",
pos: "GOL",
isGoleiro: true,
combo: false,
ovr: 70 + (guestGkRating * 2),
paid: true,
micro: { folego: 80, velocidade: 75, forca: 85, controle: 80, passe: 80, finalizacao: 30, marcacao: 80, posicionamento: 85, visao: 85, raca: 90, presenca: 100, pontualidade: 100, pagamento: 100, convivencia: 90 },
selos: { deitou: 0, terno: 0, chover: 0, bagre: 0, inimigo: 0, tirica: 0 }
};

setPlayers(prev => [guestGk, ...prev]);
setPresentPlayerIds(prev => [...prev, guestId]);
setGoalkeeperRatings(prev => ({ ...prev, [guestId]: guestGkRating }));
setShowGuestGoalkeeperModal(false);
setGuestGkName('');
triggerToast(`🧤 ${guestGk.name} adicionado com Nota ${guestGkRating}!`);
};

const handleOpenGoalModal = (teamKey) => {
if (!isTimerRunning) {
triggerToast("⚠️ Inicie o cronômetro para registrar o gol!");
return;
}
setSelectedGoalTeam(teamKey);
setShowGoalModal(true);
};

const handleRegisterGoal = async (player) => {
const actualTeamKey = selectedGoalTeam === 'teamA' ? playingTeams.teamA : playingTeams.teamB;
const actualTeamName = teamNames[actualTeamKey] || actualTeamKey.toUpperCase();

const newScoreA = selectedGoalTeam === 'teamA' ? score.teamA + 1 : score.teamA;
const newScoreB = selectedGoalTeam === 'teamB' ? score.teamB + 1 : score.teamB;

setScore({ teamA: newScoreA, teamB: newScoreB });
setMatchLogs(prev => [{ id: Date.now(), time: formatTime(timer), player: player.name, teamName: actualTeamName }, ...prev]);
setShowGoalModal(false);
triggerToast(`⚽ Gol de ${player.name} (${actualTeamName})!`);

if (currentPartidaId) {
await supabase.from('partidas').update({ gols_time_a: newScoreA, gols_time_b: newScoreB, time_a_gols: newScoreA, time_b_gols: newScoreB }).eq('id', currentPartidaId);
}
};

const handleToggleTimer = async () => {
if (!isTimerRunning && !currentPartidaId) {
const { data } = await supabase.from('partidas').insert([{
nome_time_a: teamNames[playingTeams.teamA] || 'Time A',
nome_time_b: teamNames[playingTeams.teamB] || 'Time B',
gols_time_a: 0, gols_time_b: 0, status: 'EM_ANDAMENTO'
}]).select();

if (data && data.length > 0) setCurrentPartidaId(data[0].id);
}
setIsTimerRunning(!isTimerRunning);
};

const handleConfirmFinishMatch = async () => {
const teamAColor = playingTeams.teamA;
const teamBColor = playingTeams.teamB;

let winner = score.teamA >= score.teamB ? teamAColor : teamBColor;
let loser = score.teamA >= score.teamB ? teamBColor : teamAColor;

const updatedWins = { ...consecutiveWins };
updatedWins[loser] = 0;
updatedWins[winner] = (updatedWins[winner] || 0) + 1;

let nextQueue = [...queueTeams, loser];
let nextTeamA = winner;
let nextTeamB = null;

if (updatedWins[winner] >= 2) {
updatedWins[winner] = 0;
nextQueue.push(winner);
nextTeamA = nextQueue.shift() || teamAColor;
nextTeamB = nextQueue.shift() || teamBColor;
triggerToast(`🔄 Rodízio: ${teamNames[winner]} jogou 2 e descansa!`);
} else {
nextTeamB = nextQueue.shift() || loser;
triggerToast(`🔄 Rodízio: ${teamNames[nextTeamB]} entra para desafiar!`);
}

if (currentPartidaId) {
await supabase.from('partidas').update({ gols_time_a: score.teamA, gols_time_b: score.teamB, duracao_segundos: timer, status: 'FINALIZADA' }).eq('id', currentPartidaId);
}

setPlayingTeams({ teamA: nextTeamA, teamB: nextTeamB });
setQueueTeams(nextQueue);
setConsecutiveWins(updatedWins);
setScore({ teamA: 0, teamB: 0 });
setTimer(0);
setIsTimerRunning(false);
setMatchLogs([]);
setCurrentPartidaId(null);
setShowFinishModal(false);
};

const handleSortearTimes = () => {
const confirmed = players.filter(p => presentPlayerIds.includes(p.id));
if (confirmed.length < 4) {
triggerToast("⚠️ Selecione pelo menos 4 jogadores confirmados!");
return;
}

const confirmedGk = confirmed.filter(p => p.isGoleiro).map(p => ({ ...p, gkNota: goalkeeperRatings[p.id] || 7 })).sort((a, b) => b.gkNota - a.gkNota);
const confirmedLinha = confirmed.filter(p => !p.isGoleiro).sort((a, b) => b.ovr - a.ovr);

const keys = ['verde', 'azul', 'amarelo', 'vermelho'].slice(0, numTeams);
const newTeams = { verde: [], azul: [], amarelo: [], vermelho: [] };
const bench = [];

confirmedGk.forEach((gk, i) => {
if (i < numTeams) newTeams[keys[i]].push(gk);
else bench.push(gk);
});

const totalLinhaSlots = Math.floor((confirmed.length - confirmedGk.length) / numTeams);

confirmedLinha.forEach((player) => {
let targetKey = keys[0];
let minTeamOvr = Infinity;

for (let k of keys) {
if (newTeams[k].length <= totalLinhaSlots) {
const currentOvrSum = newTeams[k].reduce((acc, p) => acc + p.ovr, 0);
if (currentOvrSum < minTeamOvr) {
minTeamOvr = currentOvrSum;
targetKey = k;
}
}
}

if (newTeams[targetKey].length <= totalLinhaSlots) newTeams[targetKey].push(player);
else bench.push(player);
});

setTeams(newTeams);
setBenchPlayers(bench);
setPlayingTeams({ teamA: keys[0], teamB: keys[1] });
setQueueTeams(keys.slice(2));
setConsecutiveWins({ verde: 0, azul: 0, amarelo: 0, vermelho: 0 });
triggerToast(`🎲 Times sorteados com Compensação de Goleiro!`);
};

const handleSelectBadgeForVote = (badge) => {
if (!votingTargetPlayer) {
triggerToast("⚠️ Escolha primeiro o atleta do seu time!");
return;
}
setPendingBadge(badge);
setShowVoteConfirmModal(true);
};

const handleConfirmVote = async () => {
const target = votingTargetPlayer;
const badge = pendingBadge;
const newSelos = { ...target.selos, [badge.key]: (target.selos[badge.key] || 0) + 1 };

setPlayers(prev => prev.map(p => p.id === target.id ? { ...p, selos: newSelos } : p));
if (selectedPlayerForPortal && selectedPlayerForPortal.id === target.id) {
setSelectedPlayerForPortal({ ...selectedPlayerForPortal, selos: newSelos });
}

setEvaluatedPlayerIds(prev => [...prev, target.id]);
setShowVoteConfirmModal(false);
setVotingTargetPlayer(null);
setPendingBadge(null);

await supabase.from('atletas').update({ selos: newSelos }).eq('id', target.id);
triggerToast(`✅ Avaliação de "${badge.label}" gravada para ${target.name}!`);
};

// RENDERIZAÇÃO: TELA DE LOGIN
if (!currentUser) {
return (
<div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-white p-4 select-none">
<div className="w-full max-w-sm bg-slate-900 border border-amber-500/30 rounded-3xl p-6 shadow-2xl space-y-6">
<div className="text-center space-y-2">
<div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 mx-auto flex items-center justify-center font-black text-slate-950 text-2xl shadow-lg shadow-amber-500/20">
FR
</div>
<h1 className="text-xl font-black text-amber-400 tracking-wider uppercase">Futebol Raiz</h1>
<p className="text-xs text-slate-400">Identificação do Atleta • Temporada 2026</p>
</div>

{loginError && (
<div className="bg-rose-500/10 border border-rose-500/40 p-3 rounded-xl text-xs text-rose-300 flex items-center gap-2">
<AlertCircleIcon className="w-4 h-4 shrink-0 text-rose-400" />
<span>{loginError}</span>
</div>
)}

<form onSubmit={handleLogin} className="space-y-4">
<div className="space-y-1">
<label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">CPF do Atleta</label>
<input
type="text"
placeholder="000.000.000-00"
required
value={cpfInput}
onChange={e => setCpfInput(e.target.value)}
className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-amber-400 font-mono font-bold outline-none focus:border-amber-400 transition"
/>
</div>

<div className="space-y-1">
<label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">PIN de Acesso (4 dígitos)</label>
<input
type="password"
maxLength={4}
placeholder="••••"
required
value={pinInput}
onChange={e => setPinInput(e.target.value)}
className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-center tracking-widest font-mono font-black text-amber-400 outline-none focus:border-amber-400 transition"
/>
<span className="text-[10px] text-slate-500 block text-right">4 últimos dígitos do celular cadastrado</span>
</div>

<button
type="submit"
disabled={isLoggingIn}
className="w-full bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-black py-3.5 rounded-xl text-xs uppercase tracking-widest shadow-lg shadow-amber-500/20 active:scale-95 transition"
>
{isLoggingIn ? 'Entrando...' : 'Entrar no Vestiário'}
</button>
</form>
</div>
</div>
);
}

// Abas Permitidas para o Nível do CPF Logado
const allowedTabs = getAvailableTabs(currentUser.cpf);

return (
<div className="flex flex-col h-[100dvh] w-full bg-slate-950 text-white font-sans overflow-hidden select-none">

{/* Toast Feedback */}
{toastMessage && (
<div className="absolute top-3 left-1/2 -translate-x-1/2 z-50 bg-amber-400 text-slate-950 font-black px-4 py-2 rounded-full shadow-2xl border border-amber-300 text-xs animate-bounce flex items-center gap-2">
<AlertCircleIcon className="w-4 h-4" />
<span>{toastMessage}</span>
</div>
)}

{/* Top Header */}
<header className="bg-slate-900 border-b border-amber-500/30 px-4 py-2.5 flex justify-between items-center shrink-0">
<div className="flex items-center gap-2">
<div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center font-black text-slate-950 text-sm shadow-md">
FR
</div>
<div>
<h1 className="font-black text-amber-400 text-sm leading-tight uppercase tracking-wider">Futebol Raiz</h1>
<p className="text-[10px] text-slate-400 font-medium">Atleta: <strong className="text-slate-200">{currentUser.name}</strong></p>
</div>
</div>

<div className="flex items-center gap-2">
{isLoading ? (
<div className="w-3 h-3 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
) : (
<span className={`w-2 h-2 rounded-full ${isTimerRunning ? 'bg-emerald-500 animate-ping' : 'bg-amber-500'}`} />
)}
<button
onClick={handleLogout}
title="Sair da conta"
className="p-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-400 hover:text-rose-400 transition active:scale-95"
>
<LogOutIcon className="w-4 h-4" />
</button>
</div>
</header>

{/* Roteador Principal de Telas */}
<main className="flex-1 overflow-y-auto relative pb-20">

{/* TELA DIRETORIA (Apenas CPF 60354985310) */}
{activeTab === 'diretoria' && allowedTabs.includes('diretoria') && (
<div className="p-4 space-y-4">
<div className="flex justify-between items-center">
<div>
<h2 className="text-base font-black text-amber-400 flex items-center gap-1.5">
<ShieldIcon className="w-4 h-4 text-amber-400" /> Painel da Diretoria
</h2>
<p className="text-[11px] text-slate-400">Gestão financeira e portaria do clube</p>
</div>
</div>

{/* Caixa & Finanças */}
<div className="grid grid-cols-2 gap-3">
<div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
<p className="text-[10px] text-slate-400 uppercase font-bold">Caixa Arrecadado</p>
<p className="text-xl font-black text-emerald-400 mt-0.5">
R$ {players.filter(p => p.paid).length * 40},00
</p>
<p className="text-[10px] text-slate-500">{players.filter(p => p.paid).length} Atletas Pagos</p>
</div>
<div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
<p className="text-[10px] text-slate-400 uppercase font-bold">A Receber</p>
<p className="text-xl font-black text-rose-500 mt-0.5">
R$ {players.filter(p => !p.paid).length * 40},00
</p>
<p className="text-[10px] text-rose-400">{players.filter(p => !p.paid).length} Pendentes</p>
</div>
</div>

{/* Exportação WhatsApp */}
<div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800 space-y-2.5">
<h3 className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
<FileTextIcon className="w-4 h-4 text-emerald-400" /> Exportação para WhatsApp
</h3>
<div className="grid grid-cols-2 gap-2">
<button
onClick={() => triggerToast("📋 Lista Portaria (CPF) copiada para o WhatsApp!")}
className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs py-2.5 px-3 rounded-xl font-bold flex items-center justify-center gap-1.5 border border-slate-700 active:scale-95 transition"
>
<CopyIcon className="w-3.5 h-3.5 text-amber-400" /> Lista Portaria (CPF)
</button>
<button
onClick={() => triggerToast("💰 Lista Presença + Pix copiada para o WhatsApp!")}
className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs py-2.5 px-3 rounded-xl font-bold flex items-center justify-center gap-1.5 active:scale-95 transition"
>
<CopyIcon className="w-3.5 h-3.5" /> Presença & Pix
</button>
</div>
</div>

{/* Lista de Pagamentos do Elenco */}
<div className="space-y-2">
<h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Elenco Registrado ({players.length})</h3>
<div className="space-y-2">
{players.map(p => (
<div key={p.id} className="bg-slate-900 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-xl bg-slate-950 border border-amber-500/40 flex flex-col items-center justify-center">
<span className="text-xs font-black text-amber-400 leading-none">{p.ovr}</span>
<span className="text-[9px] text-slate-400 font-bold">{p.pos}</span>
</div>
<div>
<p className="font-bold text-xs text-slate-100">{p.name}</p>
<p className="text-[10px] text-slate-400">CPF: {p.cpf} • Tel: {p.phone}</p>
</div>
</div>

<button
onClick={() => handleTogglePaid(p)}
className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
p.paid ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
}`}
>
{p.paid ? '💰 Pago' : '❌ Pendente'}
</button>
</div>
))}
</div>
</div>
</div>
)}

{/* TELA CADASTRO (CPFs 60354985310, 08445779958 e 09375020908) */}
{activeTab === 'cadastro' && allowedTabs.includes('cadastro') && (
<div className="p-4 space-y-4">
<div className="border-b border-slate-800 pb-2">
<h2 className="text-base font-black text-amber-400 flex items-center gap-1.5">
<UserPlusIcon className="w-4 h-4 text-amber-400" /> Cadastro de Novo Atleta
</h2>
<p className="text-[11px] text-slate-400">Defina os 11 micro-atributos e gere a Cartinha TOTY 3D</p>
</div>

<div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-3">
<input
type="text"
placeholder="Nome Completo *"
value={newPlayerData.name}
onChange={e => setNewPlayerData({...newPlayerData, name: e.target.value})}
className="w-full bg-slate-950 border border-slate-800 text-xs p-3 rounded-xl text-slate-200 focus:outline-none focus:border-amber-400"
/>

<div className="grid grid-cols-2 gap-2">
<input
type="text"
placeholder="CPF (apenas números) *"
value={newPlayerData.cpf}
onChange={e => setNewPlayerData({...newPlayerData, cpf: e.target.value})}
className="bg-slate-950 border border-slate-800 text-xs p-3 rounded-xl text-slate-200 focus:outline-none focus:border-amber-400"
/>
<input
type="text"
placeholder="Celular / WhatsApp *"
value={newPlayerData.phone}
onChange={e => setNewPlayerData({...newPlayerData, phone: e.target.value})}
className="bg-slate-950 border border-slate-800 text-xs p-3 rounded-xl text-slate-200 focus:outline-none focus:border-amber-400"
/>
</div>

<div className="grid grid-cols-2 gap-2">
<select
value={newPlayerData.pos}
onChange={e => setNewPlayerData({ ...newPlayerData, pos: e.target.value, isGoleiro: e.target.value === 'GOL' })}
className="bg-slate-950 border border-slate-800 text-xs p-3 rounded-xl text-amber-400 font-bold focus:outline-none"
>
<option value="ATA">Atacante (ATA)</option>
<option value="MID">Meio-Campo (MID)</option>
<option value="DEF">Defensor (DEF)</option>
<option value="GOL">Goleiro (GOL)</option>
</select>

<div className="flex items-center gap-2 bg-slate-950 px-3 rounded-xl border border-slate-800">
<input
type="checkbox" id="isCombo" checked={newPlayerData.combo}
onChange={e => setNewPlayerData({...newPlayerData, combo: e.target.checked})}
className="accent-amber-400 rounded"
/>
<label htmlFor="isCombo" className="text-xs text-slate-300 font-bold">Combo Churras</label>
</div>
</div>

<div className="bg-slate-950 p-3 rounded-xl border border-amber-500/40 flex justify-between items-center">
<span className="text-xs text-slate-300 font-bold">OVR Calculado (Média Ponderada):</span>
<span className="text-2xl font-black text-amber-400 font-mono">
{calculateOvrFromMicro(newPlayerData.micro)}
</span>
</div>

{/* Sliders dos Micro-Atributos */}
<div className="space-y-3 pt-2">
<div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
<span className="text-[11px] font-black text-amber-400 uppercase">1. Físico:</span>
{[
{ key: 'folego', label: 'Fôlego (Resistência)' },
{ key: 'velocidade', label: 'Velocidade & Explosão' },
{ key: 'forca', label: 'Força & Imposição' }
].map(attr => (
<div key={attr.key} className="flex items-center gap-2 text-xs">
<span className="w-36 text-slate-400 text-[10px] truncate">{attr.label}</span>
<input
type="range" min="1" max="99" value={newPlayerData.micro[attr.key]}
onChange={e => setNewPlayerData({ ...newPlayerData, micro: { ...newPlayerData.micro, [attr.key]: parseInt(e.target.value) } })}
className="flex-1 accent-amber-400 h-1.5 bg-slate-800 rounded appearance-none cursor-pointer"
/>
<span className="w-6 text-right font-mono font-bold text-amber-400">{newPlayerData.micro[attr.key]}</span>
</div>
))}
</div>

<div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
<span className="text-[11px] font-black text-amber-400 uppercase">2. Técnico:</span>
{[
{ key: 'controle', label: 'Controle (Domínio/Drible)' },
{ key: 'passe', label: 'Passe (Precisão/Força)' },
{ key: 'finalizacao', label: 'Finalização (Frieza)' },
{ key: 'marcacao', label: 'Marcação (Desarme)' }
].map(attr => (
<div key={attr.key} className="flex items-center gap-2 text-xs">
<span className="w-36 text-slate-400 text-[10px] truncate">{attr.label}</span>
<input
type="range" min="1" max="99" value={newPlayerData.micro[attr.key]}
onChange={e => setNewPlayerData({ ...newPlayerData, micro: { ...newPlayerData.micro, [attr.key]: parseInt(e.target.value) } })}
className="flex-1 accent-amber-400 h-1.5 bg-slate-800 rounded appearance-none cursor-pointer"
/>
<span className="w-6 text-right font-mono font-bold text-amber-400">{newPlayerData.micro[attr.key]}</span>
</div>
))}
</div>

<div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
<span className="text-[11px] font-black text-amber-400 uppercase">3. Tático & Mental:</span>
{[
{ key: 'posicionamento', label: 'Posicionamento' },
{ key: 'visao', label: 'Visão de Jogo' },
{ key: 'raca', label: 'Raça (Intensidade)' }
].map(attr => (
<div key={attr.key} className="flex items-center gap-2 text-xs">
<span className="w-36 text-slate-400 text-[10px] truncate">{attr.label}</span>
<input
type="range" min="1" max="99" value={newPlayerData.micro[attr.key]}
onChange={e => setNewPlayerData({ ...newPlayerData, micro: { ...newPlayerData.micro, [attr.key]: parseInt(e.target.value) } })}
className="flex-1 accent-amber-400 h-1.5 bg-slate-800 rounded appearance-none cursor-pointer"
/>
<span className="w-6 text-right font-mono font-bold text-amber-400">{newPlayerData.micro[attr.key]}</span>
</div>
))}
</div>

<div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
<span className="text-[11px] font-black text-amber-400 uppercase">4. Comportamental:</span>
{[
{ key: 'presenca', label: 'Presença nos Jogos' },
{ key: 'pontualidade', label: 'Pontualidade' },
{ key: 'pagamento', label: 'Pagamento em Dia' },
{ key: 'convivencia', label: 'Convivência em Grupo' }
].map(attr => (
<div key={attr.key} className="flex items-center gap-2 text-xs">
<span className="w-36 text-slate-400 text-[10px] truncate">{attr.label}</span>
<input
type="range" min="1" max="99" value={newPlayerData.micro[attr.key]}
onChange={e => setNewPlayerData({ ...newPlayerData, micro: { ...newPlayerData.micro, [attr.key]: parseInt(e.target.value) } })}
className="flex-1 accent-amber-400 h-1.5 bg-slate-800 rounded appearance-none cursor-pointer"
/>
<span className="w-6 text-right font-mono font-bold text-amber-400">{newPlayerData.micro[attr.key]}</span>
</div>
))}
</div>
</div>

<button
onClick={handleCreatePlayer}
className="w-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-black py-3.5 rounded-xl text-xs uppercase tracking-widest shadow-lg active:scale-95 transition mt-2"
>
Salvar Atleta & Gerar Cartinha TOTY
</button>
</div>
</div>
)}

{/* TELA SORTEIO (CPFs 60354985310, 08445779958 e 09375020908) */}
{activeTab === 'motor' && allowedTabs.includes('motor') && (
<div className="p-4 space-y-4">
<div className="flex justify-between items-center">
<div>
<h2 className="text-base font-black text-emerald-400 flex items-center gap-1.5">
<UsersIcon className="w-4 h-4" /> Sorteio & Motor de Times
</h2>
<p className="text-[11px] text-slate-400">Handicap de goleiros e balanceamento</p>
</div>

<button
onClick={handleSortearTimes}
className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs px-3.5 py-2 rounded-xl flex items-center gap-1 shadow-lg shadow-emerald-500/20 active:scale-95 transition"
>
<RefreshCwIcon className="w-3.5 h-3.5" /> Sortear Agora
</button>
</div>

{/* Avaliação dos Goleiros */}
<div className="bg-gradient-to-br from-slate-900 to-slate-950 p-3.5 rounded-2xl border border-cyan-500/40 shadow-xl space-y-3">
<div className="flex justify-between items-center border-b border-slate-800 pb-2">
<div className="flex items-center gap-2">
<span className="text-xl">🧤</span>
<div>
<h3 className="text-xs font-black text-cyan-400 uppercase">Aquecimento dos Goleiros</h3>
<p className="text-[10px] text-slate-400">Compensa goleiros dando melhores de linha</p>
</div>
</div>

<button
onClick={() => setShowGuestGoalkeeperModal(true)}
className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold text-[10px] px-2.5 py-1.5 rounded-lg active:scale-95 transition flex items-center gap-1"
>
<UserPlusIcon className="w-3 h-3" /> + Convidado
</button>
</div>

<div className="space-y-2">
{players.filter(p => p.isGoleiro && presentPlayerIds.includes(p.id)).length === 0 ? (
<p className="text-xs text-rose-400 italic py-1">Nenhum goleiro confirmado.</p>
) : (
players.filter(p => p.isGoleiro && presentPlayerIds.includes(p.id)).map(gk => {
const currentNota = goalkeeperRatings[gk.id] || 7;
return (
<div key={gk.id} className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex items-center gap-3">
<div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-500/50 flex items-center justify-center font-black text-cyan-400 text-xs shrink-0">
GOL
</div>
<div className="flex-1 min-w-0">
<div className="flex justify-between items-center mb-1">
<span className="text-xs font-bold text-slate-200 truncate">{gk.name}</span>
<span className="text-xs font-black font-mono text-cyan-400">Nota {currentNota}/10</span>
</div>
<input
type="range" min="1" max="10" value={currentNota}
onChange={(e) => setGoalkeeperRatings({ ...goalkeeperRatings, [gk.id]: parseInt(e.target.value) })}
className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
/>
</div>
</div>
);
})
)}
</div>
</div>

{/* Checklist de Presença */}
<div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800 space-y-2">
<span className="text-xs font-bold text-slate-200 block">Confirmados ({presentPlayerIds.length})</span>
<div className="grid grid-cols-2 gap-1.5 max-h-36 overflow-y-auto pr-1">
{players.map(p => {
const isChecked = presentPlayerIds.includes(p.id);
return (
<button
key={p.id}
onClick={() => setPresentPlayerIds(prev => isChecked ? prev.filter(id => id !== p.id) : [...prev, p.id])}
className={`p-2 rounded-lg text-xs font-bold flex justify-between items-center border text-left transition ${
isChecked ? 'bg-slate-800 border-amber-500/50 text-amber-300' : 'bg-slate-950 border-slate-800 text-slate-500'
}`}
>
<span className="truncate">{p.name} {p.isGoleiro ? '(GOL)' : ''}</span>
{isChecked && <CheckIcon className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
</button>
);
})}
</div>
</div>

{/* Times Sorteados */}
<div className="space-y-3">
{['verde', 'azul', 'amarelo', 'vermelho'].slice(0, numTeams).map(colorKey => {
const teamList = teams[colorKey] || [];
const avgOvr = teamList.length ? (teamList.reduce((a, b) => a + b.ovr, 0) / teamList.length).toFixed(1) : '0';

return (
<div key={colorKey} className="bg-slate-900/90 p-3 rounded-2xl border border-slate-800 space-y-2">
<div className="flex justify-between items-center border-b border-slate-800 pb-2">
<span className="font-black text-xs text-amber-400 uppercase">{teamNames[colorKey]}</span>
<span className="text-[10px] bg-slate-950 text-slate-300 px-2 py-0.5 rounded font-mono border border-slate-800">
OVR Médio: <strong className="text-amber-400">{avgOvr}</strong>
</span>
</div>

<div className="grid grid-cols-2 gap-1.5">
{teamList.map(p => (
<div key={p.id} className="bg-slate-950 p-2 rounded-lg border border-slate-800/80 flex justify-between items-center text-xs">
<span className="font-bold text-slate-200 truncate">{p.name}</span>
<span className="text-[10px] font-mono text-amber-400">{p.pos} ({p.ovr})</span>
</div>
))}
</div>
</div>
);
})}
</div>
</div>
)}

{/* TELA EM QUADRA (Todos os CPFs) */}
{activeTab === 'beira' && allowedTabs.includes('beira') && (
<div className="p-4 space-y-4">
<div className="bg-slate-900 p-2.5 rounded-2xl border border-slate-800 flex justify-between items-center text-xs">
<div className="flex items-center gap-2">
<span className="text-slate-400">Em Jogo:</span>
<span className="font-black text-emerald-400 uppercase">{teamNames[playingTeams.teamA]}</span>
<span className="text-slate-600 font-bold">vs</span>
<span className="font-black text-cyan-400 uppercase">{teamNames[playingTeams.teamB]}</span>
</div>
</div>

{/* Placar Hero */}
<div className="bg-gradient-to-b from-slate-900 to-slate-950 p-4 rounded-2xl border border-amber-500/30 shadow-2xl space-y-4 text-center">
<div className="space-y-1">
<div className="font-mono text-5xl font-black text-amber-400 tracking-widest">{formatTime(timer)}</div>
<div className="flex justify-center gap-2 pt-1">
<button
onClick={handleToggleTimer}
className={`px-5 py-2 rounded-full text-xs font-black flex items-center gap-1.5 transition active:scale-95 ${
isTimerRunning ? 'bg-amber-400 text-slate-950' : 'bg-emerald-500 text-slate-950 shadow-lg'
}`}
>
{isTimerRunning ? <PauseIcon className="w-3.5 h-3.5" /> : <PlayIcon className="w-3.5 h-3.5" />}
{isTimerRunning ? 'PAUSAR' : 'INICIAR TEMPO'}
</button>
<button onClick={() => { setIsTimerRunning(false); setTimer(0); }} className="p-2 bg-slate-800 text-slate-400 rounded-full hover:text-white">
<RotateCcwIcon className="w-4 h-4" />
</button>
</div>
</div>

<div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800">
<div className="bg-slate-950 p-3 rounded-xl border border-emerald-500/30 flex flex-col items-center">
<span className="text-[11px] font-black text-emerald-400 uppercase truncate">{teamNames[playingTeams.teamA]}</span>
<span className="text-5xl font-black font-mono my-1 text-white">{score.teamA}</span>
<button onClick={() => handleOpenGoalModal('teamA')} className="mt-2 w-full bg-emerald-500 text-slate-950 font-black py-2.5 rounded-lg text-xs active:scale-95">
#NAME?
</button>
</div>

<div className="bg-slate-950 p-3 rounded-xl border border-cyan-500/30 flex flex-col items-center">
<span className="text-[11px] font-black text-cyan-400 uppercase truncate">{teamNames[playingTeams.teamB]}</span>
<span className="text-5xl font-black font-mono my-1 text-white">{score.teamB}</span>
<button onClick={() => handleOpenGoalModal('teamB')} className="mt-2 w-full bg-cyan-500 text-slate-950 font-black py-2.5 rounded-lg text-xs active:scale-95">
#NAME?
</button>
</div>
</div>

<button
onClick={() => { setIsTimerRunning(false); setShowFinishModal(true); }}
className="w-full bg-slate-800 border border-slate-700 text-slate-300 font-bold text-xs py-3 rounded-xl active:scale-95"
>
🏁 Encerrar Partida & Rodízio (2 Vitórias = Sai)
</button>
</div>

{/* Feed de Gols */}
<div className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800 space-y-2">
<h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
<ActivityIcon className="w-3.5 h-3.5 text-amber-400" /> Histórico da Partida
</h3>
{matchLogs.length === 0 ? (
<p className="text-xs text-slate-600 italic py-2 text-center">Nenhum gol registrado.</p>
) : (
<div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
{matchLogs.map(log => (
<div key={log.id} className="bg-slate-950 p-2 rounded-lg border border-slate-800 flex justify-between items-center text-xs">
<span className="font-mono text-amber-400 font-bold">{log.time}' - {log.player}</span>
<span className="text-[10px] text-slate-400 uppercase font-bold bg-slate-900 px-2 py-0.5 rounded">{log.teamName}</span>
</div>
))}
</div>
)}
</div>
</div>
)}

{/* TELA PORTAL DO ATLETA (Todos os CPFs) */}
{activeTab === 'portal' && allowedTabs.includes('portal') && (
<div className="p-4 space-y-4">
<div className="flex items-center justify-between bg-slate-900 p-2.5 rounded-2xl border border-slate-800 text-xs">
<span className="text-slate-400">Ver Cartinha de:</span>
<select
value={selectedPlayerForPortal?.id || ''}
onChange={(e) => {
const found = players.find(p => p.id === parseInt(e.target.value));
if (found) setSelectedPlayerForPortal(found);
}}
className="bg-slate-950 text-amber-400 font-bold py-1 px-2 rounded-lg border border-amber-500/30 focus:outline-none text-xs"
>
{players.map(p => (
<option key={p.id} value={p.id}>{p.name} (OVR {p.ovr})</option>
))}
</select>
</div>

{selectedPlayerForPortal && (
<>
{/* CARTINHA EA SPORTS TOTY 3D DOURADA */}
<div className="flex justify-center my-2">
<div className="relative w-[300px] h-[465px] filter drop-shadow-[0_22px_35px_rgba(0,0,0,0.95)] drop-shadow-[0_0_25px_rgba(234,179,8,0.3)] select-none">
<svg className="absolute w-0 h-0" aria-hidden="true">
<defs>
<clipPath id="totyShieldClip" clipPathUnits="userSpaceOnUse">
<path d="M 150 5 C 185 5 238 15 268 32 C 288 42 295 56 295 72 L 295 348 C 295 388 238 430 150 460 C 62 430 5 388 5 348 L 5 72 C 5 56 12 42 32 32 C 62 15 115 5 150 5 Z" />
</clipPath>
<linearGradient id="goldGradLight" x1="0%" y1="0%" x2="100%" y2="100%">
<stop offset="0%" stopColor="#fff8db" /><stop offset="30%" stopColor="#f5d77f" /><stop offset="60%" stopColor="#c59328" /><stop offset="100%" stopColor="#875807" />
</linearGradient>
<linearGradient id="goldGrad3D" x1="0%" y1="0%" x2="0%" y2="100%">
<stop offset="0%" stopColor="#fffae0" /><stop offset="18%" stopColor="#d8ab3e" /><stop offset="50%" stopColor="#8c5b05" /><stop offset="85%" stopColor="#f3d274" /><stop offset="100%" stopColor="#5c3800" />
</linearGradient>
<linearGradient id="goldInnerRim" x1="100%" y1="0%" x2="0%" y2="100%">
<stop offset="0%" stopColor="#fff6c7" /><stop offset="50%" stopColor="#aa7c1e" /><stop offset="100%" stopColor="#f7dc8d" />
</linearGradient>
</defs>
</svg>

<div className="absolute inset-0 bg-gradient-to-b from-[#09173b] via-[#04091a] to-[#020510] flex flex-col justify-between p-3.5 pt-5 pb-3 overflow-hidden" style={{ clipPath: 'url(#totyShieldClip)' }}>
<div className="absolute inset-0 bg-[radial-gradient(#e5c062_1.3px,transparent_1.3px)] [background-size:12px_12px] opacity-15 pointer-events-none" />

<div className="flex justify-between items-start z-10 pt-1 px-1">
<div className="flex flex-col items-center w-16">
<span className="text-[3.4rem] font-black text-[#fef0cd] tracking-tighter leading-none">{selectedPlayerForPortal.ovr}</span>
<span className="text-sm font-black text-[#f3cf73] tracking-widest">{selectedPlayerForPortal.pos}</span>

<div className="w-8 h-5 my-1.5 rounded-[2px] border border-[#e5c062]/70 overflow-hidden shadow-md flex flex-col">
<div className="h-1.5 bg-[#75aadb]" />
<div className="h-2 bg-white flex items-center justify-center"><div className="w-1.5 h-1.5 rounded-full bg-[#f6b40e]" /></div>
<div className="h-1.5 bg-[#75aadb]" />
</div>

<div className="mt-0.5"><ClubCrestIcon className="w-8 h-9" /></div>
</div>

<div className="w-32 h-32 rounded-full bg-gradient-to-b from-blue-900/60 to-slate-950 border-[2.5px] border-[#f6ce65] flex items-center justify-center font-black text-amber-300 text-6xl shadow-[0_0_25px_rgba(246,206,101,0.4)] relative overflow-hidden mt-1 mr-1">
<span className="drop-shadow-lg">⚽</span>
</div>
</div>

<div className="z-10 my-0.5 bg-gradient-to-r from-[#875807] via-[#fff1b8] to-[#875807] text-slate-950 text-center py-1 font-black text-base uppercase tracking-widest rounded border-y border-[#ffffff] mx-1">
{selectedPlayerForPortal.name}
</div>

<div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-xs font-mono font-bold z-10 px-4 py-2 bg-slate-950/85 rounded-xl border border-[#e5c062]/50 mx-1">
<div className="flex justify-between"><span className="text-slate-400">PAC</span><span className="text-[#fef0cd] font-black">{selectedPlayerForPortal.micro?.velocidade || 75}</span></div>
<div className="flex justify-between"><span className="text-slate-400">DRI</span><span className="text-[#fef0cd] font-black">{selectedPlayerForPortal.micro?.controle || 75}</span></div>
<div className="flex justify-between"><span className="text-slate-400">SHO</span><span className="text-[#fef0cd] font-black">{selectedPlayerForPortal.micro?.finalizacao || 75}</span></div>
<div className="flex justify-between"><span className="text-slate-400">DEF</span><span className="text-[#fef0cd] font-black">{selectedPlayerForPortal.micro?.marcacao || 75}</span></div>
<div className="flex justify-between"><span className="text-slate-400">PAS</span><span className="text-[#fef0cd] font-black">{selectedPlayerForPortal.micro?.passe || 75}</span></div>
<div className="flex justify-between"><span className="text-slate-400">PHY</span><span className="text-[#fef0cd] font-black">{selectedPlayerForPortal.micro?.forca || 75}</span></div>
</div>

<div className="z-10 flex justify-center gap-1.5 py-0.5">
{Object.keys(selectedPlayerForPortal.selos || {}).map(key => {
const count = selectedPlayerForPortal.selos[key];
if (!count || count === 0) return null;
return (
<span key={key} className="text-[11px] bg-slate-950/90 border border-amber-500/50 px-2 py-0.5 rounded-full font-bold">
{BADGES_CONFIG[key]?.emoji} x{count}
</span>
);
})}
</div>

<div className="text-center z-10 text-[9px] text-[#f6ce65] uppercase tracking-widest font-black pb-3">FUTEBOL RAIZ • TOTY</div>
</div>

<svg className="absolute inset-0 w-full h-full pointer-events-none z-20" viewBox="0 0 300 465" fill="none">
<path d="M 150 5 C 185 5 238 15 268 32 C 288 42 295 56 295 72 L 295 348 C 295 388 238 430 150 460 C 62 430 5 388 5 348 L 5 72 C 5 56 12 42 32 32 C 62 15 115 5 150 5 Z" stroke="url(#goldGrad3D)" strokeWidth="5" />
<path d="M 150 10 C 182 10 231 19 260 35 C 278 44 286 56 286 70 L 286 344 C 286 380 232 420 150 449 C 68 420 14 380 14 344 L 14 70 C 14 56 22 44 40 35 C 69 19 118 10 150 10 Z" stroke="url(#goldInnerRim)" strokeWidth="1.2" />
</svg>

<div className="absolute bottom-1 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
<WingedShieldTipIcon className="w-8 h-4" />
</div>
</div>
</div>

<button onClick={() => triggerToast("📸 Cartinha TOTY pronta para os Stories!")} className="w-full bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-black py-3 rounded-2xl text-xs flex items-center justify-center gap-2">
<Share2Icon className="w-4 h-4" /> Compartilhar nos Stories
</button>

{/* Resenha Pós-Jogo */}
<div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3">
<h3 className="text-xs font-black text-slate-200 uppercase flex items-center gap-1.5">
<AwardIcon className="w-4 h-4 text-amber-400" /> Resenha Pós-Jogo
</h3>

<div className="space-y-1.5">
<span className="text-[11px] text-slate-300 font-bold">1. Escolha o colega de time:</span>
<div className="grid grid-cols-2 gap-2">
{players.map(p => {
const isEvaluated = evaluatedPlayerIds.includes(p.id);
const isSelected = votingTargetPlayer?.id === p.id;
return (
<button
key={p.id} disabled={isEvaluated} onClick={() => setVotingTargetPlayer(p)}
className={`p-2.5 rounded-xl border text-left text-xs transition ${
isEvaluated ? 'bg-slate-950/60 border-slate-800 text-slate-600' : isSelected ? 'bg-amber-400 text-slate-950 font-black' : 'bg-slate-950 border-slate-800 text-slate-200'
}`}
>
<div className="flex justify-between items-center">
<span className="truncate">{p.name}</span>
{isEvaluated && <CheckCircleIcon className="w-4 h-4 text-emerald-400 shrink-0" />}
</div>
</button>
);
})}
</div>
</div>

{votingTargetPlayer && (
<div className="space-y-3 pt-2 border-t border-slate-800">
<span className="text-[11px] text-amber-400 font-bold block">2. Escolha o Selo para {votingTargetPlayer.name}:</span>
<div className="grid grid-cols-3 gap-1.5">
<button onClick={() => handleSelectBadgeForVote(BADGES_CONFIG.deitou)} className="bg-slate-950 border border-emerald-500/30 text-emerald-400 p-2.5 rounded-xl text-[10px] font-black flex flex-col items-center gap-1">👑 Deitou</button>
<button onClick={() => handleSelectBadgeForVote(BADGES_CONFIG.terno)} className="bg-slate-950 border border-emerald-500/30 text-emerald-400 p-2.5 rounded-xl text-[10px] font-black flex flex-col items-center gap-1">👔 Terno</button>
<button onClick={() => handleSelectBadgeForVote(BADGES_CONFIG.bagre)} className="bg-slate-950 border border-rose-500/30 text-rose-400 p-2.5 rounded-xl text-[10px] font-black flex flex-col items-center gap-1">🐟 Bagre</button>
</div>
</div>
)}
</div>
</>
)}
</div>
)}

</main>

{/* MODAIS GOLEIRO CONVIDADO, SELEÇÃO DE GOL E FIM DE PARTIDA */}
{showGuestGoalkeeperModal && (
<div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
<div className="bg-slate-900 border border-cyan-500/40 w-full max-w-sm p-4 rounded-2xl space-y-3 shadow-2xl">
<h3 className="font-black text-xs text-cyan-400 uppercase">🧤 Goleiro Convidado</h3>
<input type="text" placeholder="Nome *" value={guestGkName} onChange={(e) => setGuestGkName(e.target.value)} className="w-full bg-slate-950 border border-slate-800 text-xs p-2.5 rounded-xl text-slate-200 focus:outline-none" />
<button onClick={handleAddGuestGoalkeeper} className="w-full bg-cyan-500 text-slate-950 font-black py-2.5 rounded-xl text-xs">Confirmar Goleiro</button>
</div>
</div>
)}

{showVoteConfirmModal && votingTargetPlayer && pendingBadge && (
<div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
<div className="bg-slate-900 border border-amber-500/40 w-full max-w-sm p-5 rounded-2xl space-y-4 text-center">
<span className="text-4xl">{pendingBadge.emoji}</span>
<p className="text-xs text-slate-200">Confirmar selo de <strong>{pendingBadge.label}</strong> para <strong>{votingTargetPlayer.name}</strong>?</p>
<div className="flex gap-2">
<button onClick={() => setShowVoteConfirmModal(false)} className="flex-1 bg-slate-800 text-slate-300 text-xs font-bold py-2.5 rounded-xl">Cancelar</button>
<button onClick={handleConfirmVote} className="flex-1 bg-amber-400 text-slate-950 text-xs font-black py-2.5 rounded-xl">Confirmar</button>
</div>
</div>
</div>
)}

{showGoalModal && (
<div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-end justify-center">
<div className="bg-slate-900 border-t-2 border-amber-500 w-full max-w-md p-4 rounded-t-2xl space-y-3 max-h-[70vh] overflow-y-auto">
<h3 className="font-black text-xs text-amber-400 uppercase">⚽ Autor do Gol</h3>
<div className="grid grid-cols-1 gap-2">
{(teams[selectedGoalTeam === 'teamA' ? playingTeams.teamA : playingTeams.teamB] || []).map(p => (
<button key={p.id} onClick={() => handleRegisterGoal(p)} className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
<span className="font-bold text-slate-100">{p.name} ({p.pos})</span>
<span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded font-bold">+1 Gol</span>
</button>
))}
</div>
</div>
</div>
)}

{showFinishModal && (
<div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
<div className="bg-slate-900 border border-amber-500/40 w-full max-w-sm p-5 rounded-2xl space-y-4 text-center">
<span className="text-4xl">🏁</span>
<h3 className="font-black text-lg text-amber-400 uppercase">Fim de Jogo!</h3>
<div className="flex gap-2">
<button onClick={() => setShowFinishModal(false)} className="flex-1 bg-slate-800 text-slate-300 text-xs font-bold py-2.5 rounded-xl">Voltar</button>
<button onClick={handleConfirmFinishMatch} className="flex-1 bg-amber-400 text-slate-950 text-xs font-black py-2.5 rounded-xl">Próximo Jogo</button>
</div>
</div>
</div>
)}

{/* BARRA DE NAVEGAÇÃO INFERIOR FILTRADA POR PERMISSÃO DE CPF */}
<nav className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 px-2 py-2 flex justify-around items-center z-40">
{allowedTabs.includes('diretoria') && (
<button onClick={() => setActiveTab('diretoria')} className={`flex flex-col items-center gap-1 px-3 py-1 rounded-lg ${activeTab === 'diretoria' ? 'text-amber-400 font-bold' : 'text-slate-500'}`}>
<ShieldIcon className="w-5 h-5" /><span className="text-[10px]">Diretoria</span>
</button>
)}

{allowedTabs.includes('cadastro') && (
<button onClick={() => setActiveTab('cadastro')} className={`flex flex-col items-center gap-1 px-3 py-1 rounded-lg ${activeTab === 'cadastro' ? 'text-amber-400 font-bold' : 'text-slate-500'}`}>
<UserPlusIcon className="w-5 h-5" /><span className="text-[10px]">Cadastro</span>
</button>
)}

{allowedTabs.includes('motor') && (
<button onClick={() => setActiveTab('motor')} className={`flex flex-col items-center gap-1 px-3 py-1 rounded-lg ${activeTab === 'motor' ? 'text-amber-400 font-bold' : 'text-slate-500'}`}>
<UsersIcon className="w-5 h-5" /><span className="text-[10px]">Sorteio</span>
</button>
)}

{allowedTabs.includes('beira') && (
<button onClick={() => setActiveTab('beira')} className={`flex flex-col items-center gap-1 px-3 py-1 rounded-lg relative ${activeTab === 'beira' ? 'text-amber-400 font-bold' : 'text-slate-500'}`}>
<ActivityIcon className="w-5 h-5" /><span className="text-[10px]">Em Quadra</span>
{isTimerRunning && <span className="absolute top-1 right-3 w-2 h-2 rounded-full bg-emerald-500 animate-ping" />}
</button>
)}

{allowedTabs.includes('portal') && (
<button onClick={() => setActiveTab('portal')} className={`flex flex-col items-center gap-1 px-3 py-1 rounded-lg ${activeTab === 'portal' ? 'text-amber-400 font-bold' : 'text-slate-500'}`}>
<TrophyIcon className="w-5 h-5" /><span className="text-[10px]">Portal</span>
</button>
)}
</nav>

</div>
);
}