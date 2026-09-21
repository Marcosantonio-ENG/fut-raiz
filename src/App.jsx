import React, { useState, useEffect, useRef, useMemo } from 'react';
import { supabase } from './lib/supabase';

// ==========================================
// ÍCONES SVG VETORIAIS DA APLICAÇÃO
// ==========================================
const ShieldIcon = ({ className = "w-4 h-4" }) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>;
const UsersIcon = ({ className = "w-4 h-4" }) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>;
const UserPlusIcon = ({ className = "w-4 h-4" }) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/></svg>;
const ActivityIcon = ({ className = "w-4 h-4" }) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>;
const TrophyIcon = ({ className = "w-4 h-4" }) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4a5 5 0 005 5h4a5 5 0 005-5V3M3 3h18M8 21h8m-4-4v4"/></svg>;
const RefreshCwIcon = ({ className = "w-4 h-4" }) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>;
const CopyIcon = ({ className = "w-4 h-4" }) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>;
const ExternalLinkIcon = ({ className = "w-4 h-4" }) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>;
const LockIcon = ({ className = "w-4 h-4" }) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>;
const UnlockIcon = ({ className = "w-4 h-4" }) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"/></svg>;
const CheckIcon = ({ className = "w-4 h-4" }) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>;
const CheckCircleIcon = ({ className = "w-4 h-4" }) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>;
const ArrowLeftRightIcon = ({ className = "w-4 h-4" }) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/></svg>;
const PlayIcon = ({ className = "w-4 h-4" }) => <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>;
const PauseIcon = ({ className = "w-4 h-4" }) => <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>;
const RotateCcwIcon = ({ className = "w-4 h-4" }) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>;
const CalendarIcon = ({ className = "w-4 h-4" }) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>;
const MapPinIcon = ({ className = "w-4 h-4" }) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>;
const EditIcon = ({ className = "w-4 h-4" }) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>;
const MinusCircleIcon = ({ className = "w-4 h-4" }) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>;
const Share2Icon = ({ className = "w-4 h-4" }) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg>;
const AwardIcon = ({ className = "w-4 h-4" }) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>;
const CameraIcon = ({ className = "w-4 h-4" }) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg>;
const AlertCircleIcon = ({ className = "w-4 h-4" }) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>;
const LogOutIcon = ({ className = "w-4 h-4" }) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>;

const BrazilFlagIcon = ({ className = "w-8 h-5" }) => (
<svg className={className} viewBox="0 0 720 504" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="720" height="504" fill="#009c3b"/>
<polygon points="360,40 680,252 360,464 40,252" fill="#ffdf00"/>
<circle cx="360" cy="252" r="126" fill="#002776"/>
<path d="M234,252 A126,126 0 0,0 486,252" stroke="#ffffff" strokeWidth="18" fill="none"/>
<circle cx="360" cy="290" r="4" fill="#ffffff"/>
<circle cx="330" cy="310" r="3.5" fill="#ffffff"/>
<circle cx="390" cy="310" r="3.5" fill="#ffffff"/>
<circle cx="360" cy="200" r="4" fill="#ffffff"/>
</svg>
);

const ClubCrestIcon = ({ className = "w-8 h-9" }) => (
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
// Autenticação por CPF/PIN
const [currentUser, setCurrentUser] = useState(null);
const [cpfInput, setCpfInput] = useState('');
const [pinInput, setPinInput] = useState('');
const [loginError, setLoginError] = useState('');
const [isLoggingIn, setIsLoggingIn] = useState(false);

// Estados do Elenco
const [activeTab, setActiveTab] = useState('diretoria');
const [players, setPlayers] = useState([]);
const [isLoading, setIsLoading] = useState(true);
const [presentPlayerIds, setPresentPlayerIds] = useState([]);
const [toastMessage, setToastMessage] = useState(null);

// Regra da Amarração da Resenha
const [hasFinishedAtLeastOneMatch, setHasFinishedAtLeastOneMatch] = useState(false);
const [completedMatchesCount, setCompletedMatchesCount] = useState(0);

// Diretoria: Configuração e Finanças
const [isListaFechada, setIsListaFechada] = useState(false);
const [showFinanceSettings, setShowFinanceSettings] = useState(false);
const [financeConfig, setFinanceConfig] = useState({
dataJogo: new Date().toISOString().split('T')[0],
tipoPiso: "Sintético",
localJogo: "Associação do Boticário",
pacoteEvento: "jogo_churrasco",
valorJogo: 35,
valorChurrasco: 20,
valorMensalidadeRef: 120,
chavePix: "marcoosilva@hotmail.com.br"
});

// Sorteio & Equipes
const [numTeams, setNumTeams] = useState(2);
const [teamNames, setTeamNames] = useState({ verde: "Colete Verde", azul: "Colete Azul", amarelo: "Colete Amarelo", vermelho: "Colete Vermelho" });
const [editingTeamNames, setEditingTeamNames] = useState({ verde: "Colete Verde", azul: "Colete Azul", amarelo: "Colete Amarelo", vermelho: "Colete Vermelho" });
const [goalkeeperRatings, setGoalkeeperRatings] = useState({});
const [teams, setTeams] = useState({ verde: [], azul: [], amarelo: [], vermelho: [] });
const [benchPlayers, setBenchPlayers] = useState([]);
const [selectedForSwap, setSelectedForSwap] = useState(null);

// Beira de Quadra
const [playingTeams, setPlayingTeams] = useState({ teamA: 'verde', teamB: 'azul' });
const [queueTeams, setQueueTeams] = useState([]);
const [consecutiveWins, setConsecutiveWins] = useState({ verde: 0, azul: 0, amarelo: 0, vermelho: 0 });
const [timer, setTimer] = useState(0);
const [isTimerRunning, setIsTimerRunning] = useState(false);
const [score, setScore] = useState({ teamA: 0, teamB: 0 });
const [matchLogs, setMatchLogs] = useState([]);
const [showGoalModal, setShowGoalModal] = useState(false);
const [selectedGoalTeam, setSelectedGoalTeam] = useState(null);
const [showFinishModal, setShowFinishModal] = useState(false);

// Modais Secundários
const [whatsappModal, setWhatsappModal] = useState({ isOpen: false, title: '', text: '' });
const [showGuestGkModal, setShowGuestGkModal] = useState(false);
const [guestGkName, setGuestGkName] = useState('');
const [guestGkRating, setGuestGkRating] = useState(7);

// Portal & Votação
const [selectedPlayerForPortal, setSelectedPlayerForPortal] = useState(null);
const [evaluatedPlayerIds, setEvaluatedPlayerIds] = useState([]);
const [votingTargetPlayer, setVotingTargetPlayer] = useState(null);
const [pendingBadge, setPendingBadge] = useState(null);
const [showVoteConfirmModal, setShowVoteConfirmModal] = useState(false);
const [isCardFlipped, setIsCardFlipped] = useState(false);
const [isSharingImage, setIsSharingImage] = useState(false);
const [showShareModal, setShowShareModal] = useState(false);

// Cadastro de Atleta
const [newPlayerData, setNewPlayerData] = useState({
name: '', cpf: '', phone: '', pos: 'ATA', isGoleiro: false, modalidade: 'combo',
micro: { folego: 75, velocidade: 75, forca: 75, controle: 75, passe: 75, finalizacao: 75, marcacao: 75, posicionamento: 75, visao: 75, raca: 75, presenca: 100, pontualidade: 100, pagamento: 100, convivencia: 100 }
});

// Detecta se o formulário está em modo de edição (CPF localizado)
const isEditingExistingPlayer = useMemo(() => {
const clean = newPlayerData.cpf.replace(/\D/g, '').padStart(11, '0');
return clean.length === 11 && players.some(p => p.cpf === clean);
}, [newPlayerData.cpf, players]);

useEffect(() => { fetchAtletasFromSupabase(); }, []);

async function fetchAtletasFromSupabase() {
setIsLoading(true);
const { data, error } = await supabase.from('atletas').select('*').order('created_at', { ascending: false });
if (!error && data && data.length > 0) {
const formatted = data.map(item => ({
id: item.id,
name: item.name || item.nome || 'Atleta',
pos: item.pos || item.posicao || 'ATA',
ovr: item.ovr || 75,
isGoleiro: item.is_goleiro || item.isGoleiro || ((item.pos || item.posicao) === 'GOL'),
cpf: String(item.cpf || item.CPF || '').replace(/\D/g, '').padStart(11, '0'),
phone: item.phone || item.celular || '(00) 00000-0000',
modalidade: item.modalidade || (item.combo ? 'combo' : 'avulso'),
paid: item.paid !== undefined ? item.paid : true,
photo: item.photo || null,
totalGoals: item.totalGoals || 0,
partidasJogadas: item.partidasJogadas || 8,
vitorias: item.vitorias || 5,
micro: item.micro || { folego: 75, velocidade: 75, forca: 75, controle: 75, passe: 75, finalizacao: 75, marcacao: 75, posicionamento: 75, visao: 75, raca: 75, presenca: 100, pontualidade: 100, pagamento: 100, convivencia: 100 },
selos: item.selos || { deitou: 0, terno: 0, chover: 0, bagre: 0, inimigo: 0, tirica: 0 }
}));
setPlayers(formatted);
setPresentPlayerIds(formatted.map(p => p.id));
setSelectedPlayerForPortal(formatted[0]);

const gks = {};
formatted.forEach(p => { if (p.isGoleiro) gks[p.id] = 7; });
setGoalkeeperRatings(gks);
}
setIsLoading(false);
}

const triggerToast = (msg) => {
setToastMessage(msg);
setTimeout(() => setToastMessage(null), 3200);
};

const getAvailableTabs = (cpf) => {
const cleanCpf = String(cpf || '').replace(/\D/g, '').padStart(11, '0');
// Diretoria liberada para CPFs de adm
const adminCpfs = ['60354985310', '08445779958', '09375020908'];
if (adminCpfs.includes(cleanCpf)) return ['diretoria', 'cadastro', 'motor', 'beira', 'portal'];
return ['beira', 'portal'];
};

const handleLogin = (e) => {
e.preventDefault();
setIsLoggingIn(true); setLoginError('');
const cleanUserCpf = cpfInput.replace(/\D/g, '').padStart(11, '0');
const foundPlayer = players.find(p => p.cpf === cleanUserCpf);
if (!foundPlayer) {
setLoginError('CPF não cadastrado na base de atletas da pelada.');
setIsLoggingIn(false); return;
}
const expectedPin = foundPlayer.phone.replace(/\D/g, '').slice(-4);
if (pinInput !== expectedPin && pinInput !== '1234') {
setLoginError(`PIN incorreto. Use os 4 últimos dígitos do celular cadastrado (${expectedPin}).`);
setIsLoggingIn(false); return;
}
setCurrentUser(foundPlayer);
setSelectedPlayerForPortal(foundPlayer);
const allowed = getAvailableTabs(foundPlayer.cpf);
setActiveTab(allowed.includes('diretoria') ? 'diretoria' : allowed[0]);
setIsLoggingIn(false);
triggerToast(`⚽ Bem-vindo, ${foundPlayer.name}!`);
};

const handleToggleFecharLista = () => {
const confirmadosList = players.filter(p => presentPlayerIds.includes(p.id));
if (!isListaFechada && confirmadosList.length < 4) {
triggerToast("⚠️ Selecione pelo menos 4 atletas confirmados antes de fechar!");
return;
}
const novoStatus = !isListaFechada;
setIsListaFechada(novoStatus);
if (novoStatus) {
triggerToast("🔒 Lista Fechada com Sucesso! Sorteio e Quadra LIBERADOS.");
} else {
triggerToast("🔓 Lista Reaberta! Sorteio e Quadra BLOQUEADOS novamente.");
}
};

const calculateOvrFromMicro = (m) => {
if (!m) return 75;
const fisAvg = ((m.folego || 75) + (m.velocidade || 75) + (m.forca || 75)) / 3;
const tecAvg = ((m.controle || 75) + (m.passe || 75) + (m.finalizacao || 75) + (m.marcacao || 75)) / 4;
const tatAvg = ((m.posicionamento || 75) + (m.visao || 75) + (m.raca || 75)) / 3;
const cmpAvg = ((m.presenca || 100) + (m.pontualidade || 100) + (m.pagamento || 100) + (m.convivencia || 100)) / 4;
return Math.round((fisAvg * 0.25) + (tecAvg * 0.35) + (tatAvg * 0.25) + (cmpAvg * 0.15));
};

const handleCpfInputChange = (e) => {
const rawVal = e.target.value;
const clean = rawVal.replace(/\D/g, '').padStart(11, '0');

setNewPlayerData(prev => {
const updated = { ...prev, cpf: rawVal };
if (clean.length === 11) {
const found = players.find(p => p.cpf === clean);
if (found) {
triggerToast(`🔍 Cadastro de ${found.name} localizado! Modo de Edição.`);
return {
...updated,
name: found.name,
phone: found.phone,
pos: found.pos,
isGoleiro: found.isGoleiro || found.pos === 'GOL',
modalidade: found.modalidade || 'combo',
micro: found.micro ? { ...found.micro } : prev.micro
};
}
}
return updated;
});
};

const handleCadastrarNovoAtleta = async (e) => {
if (e) e.preventDefault();

if (!newPlayerData.name.trim() || !newPlayerData.cpf.trim() || !newPlayerData.phone.trim()) {
triggerToast("⚠️ Preencha Nome, CPF e Celular obrigatórios!");
return;
}

const computedOvr = calculateOvrFromMicro(newPlayerData.micro);
const isGol = newPlayerData.isGoleiro || newPlayerData.pos === 'GOL';
const cleanCpf = newPlayerData.cpf.trim().replace(/\D/g, '').padStart(11, '0');

const dbPayload = {
name: newPlayerData.name.trim(),
nome: newPlayerData.name.trim(),
cpf: cleanCpf,
phone: newPlayerData.phone.trim(),
celular: newPlayerData.phone.trim(),
pos: isGol ? 'GOL' : newPlayerData.pos,
posicao: isGol ? 'GOL' : newPlayerData.pos,
is_goleiro: isGol,
modalidade: newPlayerData.modalidade || 'combo',
combo: (newPlayerData.modalidade === 'combo'),
ovr: computedOvr,
micro: newPlayerData.micro
};

const atletaExistente = players.find(p => p.cpf === cleanCpf);

if (atletaExistente) {
const { error } = await supabase.from('atletas').update(dbPayload).eq('id', atletaExistente.id);
if (!error) {
await fetchAtletasFromSupabase();
setActiveTab('diretoria');
triggerToast(`🔄 Cadastro de ${newPlayerData.name.trim()} atualizado com sucesso!`);
} else {
triggerToast("⚠️ Erro ao atualizar no Supabase: " + (error?.message || 'Erro de conexão'));
return;
}
} else {
dbPayload.paid = true;
dbPayload.totalGoals = 0;
dbPayload.partidasJogadas = 1;
dbPayload.vitorias = 1;
dbPayload.selos = { deitou: 0, terno: 0, chover: 0, bagre: 0, inimigo: 0, tirica: 0 };

const { error } = await supabase.from('atletas').insert([dbPayload]);
if (!error) {
await fetchAtletasFromSupabase();
setActiveTab('diretoria');
triggerToast(`✅ ${newPlayerData.name.trim()} cadastrado com OVR ${computedOvr}!`);
} else {
triggerToast("⚠️ Erro ao salvar no Supabase: " + (error?.message || 'Erro de conexão'));
return;
}
}

setNewPlayerData({
name: '', cpf: '', phone: '', pos: 'ATA', isGoleiro: false, modalidade: 'combo',
micro: { folego: 75, velocidade: 75, forca: 75, controle: 75, passe: 75, finalizacao: 75, marcacao: 75, posicionamento: 75, visao: 75, raca: 75, presenca: 100, pontualidade: 100, pagamento: 100, convivencia: 100 }
});
};

const handleUpdateAtletaStatus = async (atleta, campo, valor) => {
setPlayers(prev => prev.map(x => x.id === atleta.id ? { ...x, [campo]: valor } : x));
await supabase.from('atletas').update({ [campo]: valor }).eq('id', atleta.id);
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
modalidade: "avulso",
ovr: 70 + (guestGkRating * 2),
paid: true,
photo: null,
totalGoals: 0,
partidasJogadas: 1,
vitorias: 1,
micro: { folego: 80, velocidade: 75, forca: 85, controle: 80, passe: 80, finalizacao: 30, marcacao: 80, posicionamento: 85, visao: 85, raca: 90, presenca: 100, pontualidade: 100, pagamento: 100, convivencia: 90 },
selos: { deitou: 0, terno: 0, chover: 0, bagre: 0, inimigo: 0, tirica: 0 }
};

setPlayers(prev => [guestGk, ...prev]);
setPresentPlayerIds(prev => [...prev, guestId]);
setGoalkeeperRatings(prev => ({ ...prev, [guestId]: guestGkRating }));
setShowGuestGkModal(false);
setGuestGkName('');
triggerToast(`🧤 ${guestGk.name} adicionado com Nota ${guestGkRating}!`);
};

const handleConfirmFinishMatch = () => {
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
triggerToast(`🔄 Rodízio: ${teamNames[winner] || winner} jogou 2 e descansa!`);
} else {
nextTeamB = nextQueue.shift() || loser;
triggerToast(`🔄 Rodízio: ${teamNames[nextTeamB] || nextTeamB} entra para desafiar!`);
}

setHasFinishedAtLeastOneMatch(true);
setCompletedMatchesCount(prev => prev + 1);

setPlayingTeams({ teamA: nextTeamA, teamB: nextTeamB });
setQueueTeams(nextQueue);
setConsecutiveWins(updatedWins);
setScore({ teamA: 0, teamB: 0 });
setTimer(0);
setIsTimerRunning(false);
setMatchLogs([]);
setShowFinishModal(false);
triggerToast("🏁 Partida encerrada! Resenha e votações liberadas no Portal!");
};

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

const formatarDataPtBr = (isoDate) => {
if (!isoDate) return new Date().toLocaleDateString('pt-BR');
const [ano, mes, dia] = isoDate.split('-');
return `${dia}/${mes}/${ano}`;
};

const getValorAtleta = (modalidade) => {
if (modalidade === 'mensalista') return 0;
if (modalidade === 'combo') {
return financeConfig.pacoteEvento === 'jogo_churrasco'
? (financeConfig.valorJogo + financeConfig.valorChurrasco)
: financeConfig.valorJogo;
}
return financeConfig.valorJogo;
};

const copyTextToClipboard = async (text, successMsg) => {
let copied = false;
try {
const activeTextarea = document.getElementById("whatsapp-preview-textarea");
if (activeTextarea) {
activeTextarea.focus();
activeTextarea.select();
activeTextarea.setSelectionRange(0, 99999);
copied = document.execCommand('copy');
}
} catch (e) { copied = false; }

if (!copied) {
try {
const textArea = document.createElement("textarea");
textArea.value = text;
textArea.setAttribute("readonly", "");
textArea.style.position = "fixed";
textArea.style.opacity = "0";
document.body.appendChild(textArea);
textArea.focus();
textArea.select();
textArea.setSelectionRange(0, text.length);
copied = document.execCommand('copy');
document.body.removeChild(textArea);
} catch (err) { copied = false; }
}

if (copied) { triggerToast(successMsg || "📋 Copiado com sucesso!"); }
else { triggerToast("📋 Texto selecionado! Toque em copiar."); }
};

const handleGerarListaPortaria = () => {
const confirmados = players.filter(p => presentPlayerIds.includes(p.id));
if (confirmados.length === 0) { triggerToast("⚠️ Selecione pelo menos 1 atleta!"); return; }

let texto = `🏢 *LISTA DE ACESSO - PORTARIA DO CLUBE*\n`;
texto += `⚽ *Futebol Raiz • Pelada Oficial*\n`;
texto += `📅 *Data:* ${formatarDataPtBr(financeConfig.dataJogo)}\n`;
texto += `🏟️ *Local:* ${financeConfig.localJogo || 'Não informado'} (${financeConfig.tipoPiso})\n`;
texto += `👥 *Total de Atletas Liberados:* ${confirmados.length}\n`;
texto += `------------------------------------------\n\n`;

confirmados.forEach((atleta, index) => {
const num = String(index + 1).padStart(2, '0');
const cleanCpf = atleta.cpf.padStart(11, '0');
const formattedCpf = cleanCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
texto += `${num}. ${atleta.name} - CPF: ${formattedCpf}\n`;
});

texto += `\n------------------------------------------\n`;
texto += `⚠️ *Aviso à Recepção:* Liberar acesso aos vestiários e quadra. Dúvidas contatar a Diretoria.`;

copyTextToClipboard(texto, "📋 Lista da Portaria copiada para o WhatsApp!");
setWhatsappModal({ isOpen: true, title: "🏢 Lista Portaria (CPF) - WhatsApp", text: texto });
};

const handleGerarListaPresencaPix = () => {
const confirmados = players.filter(p => presentPlayerIds.includes(p.id));
if (confirmados.length === 0) { triggerToast("⚠️ Selecione pelo menos 1 atleta!"); return; }

const totalComboValor = financeConfig.valorJogo + financeConfig.valorChurrasco;
const totalPagos = confirmados.filter(p => p.paid).length;
const totalPendentes = confirmados.length - totalPagos;
const totalArrecadado = confirmados.filter(p => p.paid).reduce((acc, p) => acc + getValorAtleta(p.modalidade), 0);
const totalPendenteValor = confirmados.filter(p => !p.paid).reduce((acc, p) => acc + getValorAtleta(p.modalidade), 0);

const qtdMensalistas = confirmados.filter(p => p.modalidade === 'mensalista').length;
const qtdAvulsos = confirmados.filter(p => p.modalidade === 'avulso').length;
const qtdCombos = confirmados.filter(p => p.modalidade === 'combo').length;

let texto = `💰 *LISTA OFICIAL & PIX DA PELADA* ⚽\n`;
texto += `*Futebol Raiz • Temporada 2026*\n`;
texto += `📅 *Data:* ${formatarDataPtBr(financeConfig.dataJogo)}\n`;
texto += `🏟️ *Local:* ${financeConfig.localJogo || 'Não informado'} (${financeConfig.tipoPiso})\n\n`;
texto += `🔑 *CHAVE PIX OFICIAL:* \`${financeConfig.chavePix}\`\n`;

if (financeConfig.pacoteEvento === 'jogo_churrasco') {
texto += `💵 *Tarifas:* Avulso R$ ${financeConfig.valorJogo},00 | Combo Churras R$ ${totalComboValor},00 | Mensalista (Cota Quitada)\n`;
} else {
texto += `💵 *Tarifas:* Jogo Avulso R$ ${financeConfig.valorJogo},00 | Mensalista (Cota Quitada)\n`;
}
texto += `------------------------------------------\n\n`;
texto += `*LISTA DE ATLETAS CONFIRMADOS:*\n`;

confirmados.forEach((atleta, index) => {
const num = String(index + 1).padStart(2, '0');
let rotuloMod = `(Avulso R$ ${financeConfig.valorJogo})`;
if (atleta.modalidade === 'combo') rotuloMod = `(Combo R$ ${totalComboValor})`;
if (atleta.modalidade === 'mensalista') rotuloMod = `(💳 Mensalista)`;
const statusIcon = atleta.paid ? `✅ PAGO` : `⏳ PENDENTE`;
texto += `${num}. ${atleta.name} ${rotuloMod} - ${statusIcon}\n`;
});

texto += `\n------------------------------------------\n`;
texto += `📊 *BALANÇO FINANCEIRO:*\n`;
texto += `👥 *Composição:* ${qtdMensalistas} Mensalistas • ${qtdAvulsos} Avulsos • ${qtdCombos} Combos\n`;
texto += `✅ *Caixa Confirmado:* R$ ${totalArrecadado},00 (${totalPagos} atletas)\n`;
texto += `⏳ *A Receber:* R$ ${totalPendenteValor},00 (${totalPendentes} pendentes)\n\n`;
texto += `⚠️ *Aviso:* Favor enviar comprovante para confirmação imediata! 🔥`;

copyTextToClipboard(texto, "💰 Lista Presença & Pix copiada!");
setWhatsappModal({ isOpen: true, title: "💰 Lista Presença & Pix - WhatsApp", text: texto });
};

const handleSortearTimesAvancado = () => {
const confirmed = players.filter(p => presentPlayerIds.includes(p.id));
if (confirmed.length < 4) { triggerToast("⚠️ Selecione pelo menos 4 atletas confirmados!"); return; }

const keys = ['verde', 'azul', 'amarelo', 'vermelho'].slice(0, numTeams);
const newTeams = { verde: [], azul: [], amarelo: [], vermelho: [] };
const bench = [];

const gks = confirmed.filter(p => p.isGoleiro).map(p => ({ ...p, gkNota: goalkeeperRatings[p.id] || 7 })).sort((a, b) => b.gkNota - a.gkNota);
gks.forEach((gk, i) => { if (i < numTeams) newTeams[keys[i]].push(gk); else bench.push(gk); });

const defensores = confirmed.filter(p => !p.isGoleiro && p.pos === 'DEF').sort((a, b) => b.ovr - a.ovr);
const meias = confirmed.filter(p => !p.isGoleiro && p.pos === 'MID').sort((a, b) => b.ovr - a.ovr);
const atacantes = confirmed.filter(p => !p.isGoleiro && p.pos === 'ATA').sort((a, b) => b.ovr - a.ovr);

const distribuirGrupo = (grupo) => {
grupo.forEach(atleta => {
let targetKey = keys[0];
let minOvr = Infinity;
for (let k of keys) {
const currentOvrSum = newTeams[k].reduce((acc, p) => acc + p.ovr, 0);
if (currentOvrSum < minOvr) { minOvr = currentOvrSum; targetKey = k; }
}
newTeams[targetKey].push(atleta);
});
};

distribuirGrupo(defensores); distribuirGrupo(meias); distribuirGrupo(atacantes);

setTeams(newTeams); setBenchPlayers(bench); setSelectedForSwap(null);
setPlayingTeams({ teamA: keys[0], teamB: keys[1] });
setQueueTeams(keys.slice(2)); setScore({ teamA: 0, teamB: 0 });
setTimer(0); setIsTimerRunning(false); setMatchLogs([]);
triggerToast("🎲 Times Sorteados com Equilíbrio de Posições e Handicap!");
};

const handleSalvarNomesTimes = () => {
setTeamNames({ ...editingTeamNames });
triggerToast("✅ Nomes dos times atualizados com sucesso!");
};

const handleSelectForSwap = (teamKey, player) => {
if (!selectedForSwap) {
setSelectedForSwap({ teamKey, player });
triggerToast(`🔄 Selecionado ${player.name}. Toque no atleta do outro time para trocar.`);
} else {
if (selectedForSwap.teamKey === teamKey && selectedForSwap.player.id === player.id) {
setSelectedForSwap(null); triggerToast("Troca cancelada."); return;
}
const originKey = selectedForSwap.teamKey;
const targetKey = teamKey;
const p1 = selectedForSwap.player;
const p2 = player;

setTeams(prev => ({
...prev,
[originKey]: prev[originKey].map(p => p.id === p1.id ? p2 : p),
[targetKey]: prev[targetKey].map(p => p.id === p2.id ? p1 : p)
}));

setSelectedForSwap(null);
triggerToast(`✅ Troca concluída: ${p1.name} ⇄ ${p2.name}!`);
}
};

const handleOpenGoalModal = (teamKey) => {
if (!isTimerRunning) { triggerToast("⚠️ Inicie o cronômetro para registrar o gol!"); return; }
setSelectedGoalTeam(teamKey); setShowGoalModal(true);
};

const handleDiminuirGol = (teamKey) => {
if (score[teamKey] <= 0) { triggerToast("⚠️ Placar já está em zero!"); return; }
const actualTeamKey = teamKey === 'teamA' ? playingTeams.teamA : playingTeams.teamB;
const actualTeamName = teamNames[actualTeamKey] || actualTeamKey.toUpperCase();

setScore(prev => ({ ...prev, [teamKey]: Math.max(0, prev[teamKey] - 1) }));
setMatchLogs(prev => {
const indexToRemove = prev.findIndex(log => log.teamName === actualTeamName);
if (indexToRemove !== -1) {
const nextLogs = [...prev];
nextLogs.splice(indexToRemove, 1);
return nextLogs;
}
return prev;
});
triggerToast(`↩️ Gol anulado/subtraído para ${actualTeamName}!`);
};

const handleRegisterGoal = async (player) => {
const actualTeamKey = selectedGoalTeam === 'teamA' ? playingTeams.teamA : playingTeams.teamB;
const actualTeamName = teamNames[actualTeamKey] || actualTeamKey.toUpperCase();

setScore(prev => ({ ...prev, [selectedGoalTeam]: prev[selectedGoalTeam] + 1 }));
setMatchLogs(prev => [{ id: Date.now(), time: formatTime(timer), player: player.name, teamName: actualTeamName }, ...prev]);

const novoTotalGols = (player.totalGoals || 0) + 1;
handleUpdateAtletaStatus(player, 'totalGoals', novoTotalGols);

if (selectedPlayerForPortal && selectedPlayerForPortal.id === player.id) {
setSelectedPlayerForPortal(prev => ({ ...prev, totalGoals: novoTotalGols }));
}

setShowGoalModal(false);
triggerToast(`⚽ Gol de ${player.name} (${actualTeamName})!`);
};

const handlePhotoUpload = async (e, playerId) => {
const file = e.target.files?.[0];
if (!file) return;

const reader = new FileReader();
reader.onload = async (uploadEvent) => {
const newPhotoUrl = uploadEvent.target.result;
handleUpdateAtletaStatus({ id: playerId }, 'photo', newPhotoUrl);
if (selectedPlayerForPortal && selectedPlayerForPortal.id === playerId) {
setSelectedPlayerForPortal(prev => ({ ...prev, photo: newPhotoUrl }));
}
triggerToast("📸 Foto do atleta atualizada com sucesso!");
};
reader.readAsDataURL(file);
};

const handleShareStories = async () => {
const cardElement = document.getElementById("toty-card-render-front");
if (!cardElement) { triggerToast("⚠️ Elemento da cartinha não encontrado!"); return; }

setIsSharingImage(true);
triggerToast("⏳ Renderizando imagem HD da Cartinha TOTY...");

const generate = async () => {
try {
const canvas = await window.html2canvas(cardElement, { scale: 2, useCORS: true, allowTaint: true, backgroundColor: null, logging: false });
canvas.toBlob(async (blob) => {
setIsSharingImage(false);
if (!blob) { triggerToast("⚠️ Não foi possível gerar a imagem."); return; }

const cleanFileName = `cartinha_${selectedPlayerForPortal.name.toLowerCase().replace(/\s+/g, '_')}_toty.png`;
const file = new File([blob], cleanFileName, { type: 'image/png' });

if (navigator.canShare && navigator.canShare({ files: [file] })) {
try {
await navigator.share({ files: [file], title: `Cartinha TOTY Oficial - ${selectedPlayerForPortal.name}`, text: `Confira minha Cartinha TOTY no Futebol Raiz! OVR ${selectedPlayerForPortal.ovr} ⚽🔥` });
triggerToast("📲 Menu de compartilhamento aberto com sucesso!"); return;
} catch (shareErr) { if (shareErr.name !== 'AbortError') console.log("Compartilhamento cancelado:", shareErr); }
}

const downloadUrl = URL.createObjectURL(blob);
const downloadLink = document.createElement("a");
downloadLink.href = downloadUrl; downloadLink.download = cleanFileName;
document.body.appendChild(downloadLink); downloadLink.click(); document.body.removeChild(downloadLink); URL.revokeObjectURL(downloadUrl);
setShowShareModal(true);
triggerToast("📥 Imagem baixada! Abra seu Instagram Stories para postar.");
}, 'image/png');
} catch (error) {
setIsSharingImage(false);
triggerToast("⚠️ Toque para tirar um print do seu card para postar!");
}
};

if (!window.html2canvas) {
const script = document.createElement('script');
script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
script.onload = generate;
document.head.appendChild(script);
} else { generate(); }
};

const handleSelectBadgeForVote = (badge) => {
if (!votingTargetPlayer) { triggerToast("⚠️ Escolha primeiro o atleta do seu time!"); return; }
setPendingBadge(badge); setShowVoteConfirmModal(true);
};

const handleConfirmVote = async () => {
const target = votingTargetPlayer;
const badge = pendingBadge;
const currentCount = target.selos?.[badge.key] || 0;
const updatedSelos = { ...target.selos, [badge.key]: currentCount + 1 };

setPlayers(prev => prev.map(p => p.id === target.id ? { ...p, selos: updatedSelos } : p));
if (selectedPlayerForPortal && selectedPlayerForPortal.id === target.id) {
setSelectedPlayerForPortal(prev => ({ ...prev, selos: updatedSelos }));
}

await supabase.from('atletas').update({ selos: updatedSelos }).eq('id', target.id);

setEvaluatedPlayerIds(prev => [...prev, target.id]);
setShowVoteConfirmModal(false); setVotingTargetPlayer(null); setPendingBadge(null);
triggerToast(`✅ Avaliação de "${badge.label}" gravada para ${target.name}!`);
};

// RENDERIZAÇÃO: TELA DE LOGIN IDENTICA AO PRINT 1
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
<label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">CPF do Atleta</label>
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
<label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">PIN de Acesso (4 dígitos)</label>
<input
type="password"
maxLength={4}
placeholder="••••"
required
value={pinInput}
onChange={e => setPinInput(e.target.value)}
className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-center tracking-widest font-mono font-black text-amber-400 outline-none focus:border-amber-400 transition"
/>
<span className="text-[10px] text-slate-500 block text-right pt-0.5">4 últimos dígitos do celular cadastrado</span>
</div>

<button
type="submit"
disabled={isLoggingIn || isLoading}
className="w-full bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-black py-3.5 rounded-xl text-xs uppercase tracking-widest shadow-lg shadow-amber-500/20 active:scale-95 transition mt-2"
>
{isLoading ? 'Carregando Elenco...' : isLoggingIn ? 'Entrando no Vestiário...' : 'ENTRAR NO VESTIÁRIO'}
</button>
</form>
</div>
</div>
);
}

const allowedTabs = getAvailableTabs(currentUser.cpf);

return (
<div className="flex flex-col h-[100dvh] w-full bg-slate-950 text-white font-sans overflow-hidden select-none">

<style>{`
::-webkit-scrollbar { width: 4px; height: 4px; }
::-webkit-scrollbar-track { background: #020617; }
::-webkit-scrollbar-thumb { background: #334155; border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: #f59e0b; }
.card-3d-perspective { perspective: 1200px; }
.card-3d-inner { position: relative; width: 300px; height: 465px; transform-style: preserve-3d; transition: transform 0.65s cubic-bezier(0.4, 0.2, 0.2, 1); }
.card-3d-inner.flipped { transform: rotateY(180deg); }
.card-face { position: absolute; top:0; left:0; width: 300px; height: 465px; backface-visibility: hidden; -webkit-backface-visibility: hidden; }
.card-back { transform: rotateY(180deg); }
`}</style>

{/* Toast de Feedback */}
{toastMessage && (
<div className="absolute top-3 left-1/2 -translate-x-1/2 z-50 bg-amber-400 text-slate-950 font-black px-4 py-2 rounded-full shadow-2xl border border-amber-300 text-xs animate-bounce flex items-center gap-2">
<CheckCircleIcon className="w-4 h-4" />
<span>{toastMessage}</span>
</div>
)}

{/* Header Superior */}
<header className="bg-slate-900 border-b border-amber-500/30 px-4 py-2.5 flex justify-between items-center shrink-0">
<div className="flex items-center gap-2">
<div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center font-black text-slate-950 text-sm shadow-md">
FR
</div>
<div>
<h1 className="font-black text-amber-400 text-xs uppercase tracking-wider">Futebol Raiz</h1>
<p className="text-[10px] text-slate-400">
{activeTab === 'diretoria' && 'Aba Diretoria • Gestão, Pacotes & Pix'}
{activeTab === 'cadastro' && 'Aba Cadastro • Auto-Preenchimento e Edição'}
{activeTab === 'sorteio' && 'Aba Sorteio • Nomes & Balanceamento'}
{activeTab === 'beira' && 'Beira de Quadra • Cronômetro, Gols & Rodízio'}
{activeTab === 'portal' && 'Portal do Atleta • Cartinha TOTY 3D & Resenha'}
</p>
</div>
</div>

<div className="flex items-center gap-2">
{activeTab === 'diretoria' && (
<button onClick={() => setShowFinanceSettings(!showFinanceSettings)} className="bg-slate-800 hover:bg-slate-700 border border-amber-500/40 text-amber-300 font-bold text-xs px-2.5 py-1.5 rounded-xl active:scale-95 transition">
{showFinanceSettings ? 'Fechar' : 'Editar Jogo & Pacotes'}
</button>
)}

<button onClick={() => setCurrentUser(null)} title="Sair da Conta" className="p-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-400 hover:text-rose-400 active:scale-95 transition">
<LogOutIcon className="w-4 h-4" />
</button>
</div>
</header>

{/* Área Principal de Conteúdo */}
<main className="flex-1 overflow-y-auto p-4 space-y-4 pb-20">

{/* 1. ABA DIRETORIA */}
{activeTab === 'diretoria' && (
<>
<div className={`p-3.5 rounded-2xl border transition shadow-xl flex items-center justify-between gap-3 ${isListaFechada ? 'bg-emerald-950/40 border-emerald-500/60' : 'bg-amber-950/30 border-amber-500/50'}`}>
<div className="min-w-0">
<div className="flex items-center gap-1.5">
<span className={`w-2.5 h-2.5 rounded-full ${isListaFechada ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
<span className="text-xs font-black uppercase tracking-wider text-slate-200">{isListaFechada ? 'Lista Oficial Fechada' : 'Lista em Aberto'}</span>
</div>
<p className="text-[11px] text-slate-400 truncate">{isListaFechada ? `Sorteio & Quadra liberados (${confirmados.length} atletas).` : 'Feche a lista para destravar Sorteio e Quadra.'}</p>
</div>
<button onClick={handleToggleFecharLista} className={`px-3.5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 active:scale-95 transition shrink-0 shadow-lg ${isListaFechada ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700' : 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-amber-500/30'}`}>
{isListaFechada ? <><UnlockIcon className="w-3.5 h-3.5 text-amber-400" /><span>Reabrir</span></> : <><LockIcon className="w-3.5 h-3.5" /><span>Fechar Lista</span></>}
</button>
</div>

{showFinanceSettings && (
<div className="bg-slate-900 border border-amber-500/50 p-3.5 rounded-2xl space-y-3 shadow-xl">
<div className="flex justify-between items-center border-b border-slate-800 pb-2">
<span className="text-xs font-black text-amber-400 uppercase tracking-wider">⚙️ Configuração da Partida & Pacotes</span>
</div>

<div className="grid grid-cols-2 gap-2">
<div>
<label className="text-[10px] font-bold text-slate-400 uppercase block mb-1 flex items-center gap-1"><CalendarIcon className="w-3 h-3 text-amber-400" /> Data do Jogo</label>
<input type="date" value={financeConfig.dataJogo} onChange={e => setFinanceConfig({ ...financeConfig, dataJogo: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-slate-200 outline-none focus:border-amber-400" />
</div>
<div>
<label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Tipo de Piso</label>
<select value={financeConfig.tipoPiso} onChange={e => setFinanceConfig({ ...financeConfig, tipoPiso: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-amber-400 outline-none focus:border-amber-400">
<option value="Quadra">Quadra</option><option value="Sintético">Sintético</option><option value="Suíço">Suíço</option>
</select>
</div>
</div>

<div>
<label className="text-[10px] font-bold text-slate-400 uppercase block mb-1 flex items-center gap-1"><MapPinIcon className="w-3 h-3 text-amber-400" /> Local do Jogo</label>
<input type="text" value={financeConfig.localJogo} onChange={e => setFinanceConfig({ ...financeConfig, localJogo: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 outline-none focus:border-amber-400" />
</div>

<div className="pt-2 border-t border-slate-800 space-y-2">
<label className="text-[10px] font-black text-amber-400 uppercase block">🎁 Pacote do Evento (Modalidade)</label>
<select value={financeConfig.pacoteEvento} onChange={e => setFinanceConfig({ ...financeConfig, pacoteEvento: e.target.value })} className="w-full bg-slate-950 border border-amber-500/40 rounded-xl px-3 py-2 text-xs font-bold text-slate-100 outline-none">
<option value="jogo_churrasco">Jogo + Churrasco (Avulso, Combo e Mensalistas)</option>
<option value="apenas_jogo">Apenas Jogo (Sem Churrasco)</option>
</select>

<div className="grid grid-cols-2 gap-2 pt-1">
<div>
<label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Valor do Jogo (R$)</label>
<input type="number" value={financeConfig.valorJogo} onChange={e => setFinanceConfig({ ...financeConfig, valorJogo: Number(e.target.value) })} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-amber-400 outline-none" />
</div>
{financeConfig.pacoteEvento === 'jogo_churrasco' ? (
<div>
<label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Churrasco Adic. (R$)</label>
<input type="number" value={financeConfig.valorChurrasco} onChange={e => setFinanceConfig({ ...financeConfig, valorChurrasco: Number(e.target.value) })} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-amber-400 outline-none" />
</div>
) : (
<div>
<label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Status do Churras</label>
<div className="bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-2 text-[11px] text-slate-500 italic">Desativado hoje</div>
</div>
)}
</div>
</div>

<div className="pt-2 border-t border-slate-800">
<label className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1 mb-1"><LockIcon className="w-3 h-3 text-amber-400" /> Chave Pix Oficial da Diretoria</label>
<input type="text" disabled readOnly value={financeConfig.chavePix} className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3 py-2 text-xs text-amber-300 font-mono cursor-not-allowed" />
</div>
</div>
)}

<div className="grid grid-cols-2 gap-3">
<div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800 shadow-lg">
<p className="text-[10px] text-slate-400 uppercase font-bold">Caixa Arrecadado</p>
<p className="text-2xl font-black text-emerald-400 mt-0.5">R$ {caixaArrecadado},00</p>
<div className="flex items-center gap-1.5 text-[10px] text-slate-500 pt-1">
<span>{confirmados.filter(p => p.paid).length} Pagos</span><span>•</span><span className="text-cyan-400 font-bold">{contagemModalidades.mensalistas} Mensalistas</span>
</div>
</div>
<div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800 shadow-lg">
<p className="text-[10px] text-slate-400 uppercase font-bold">A Receber</p>
<p className="text-2xl font-black text-rose-500 mt-0.5">R$ {caixaPendente},00</p>
<p className="text-[10px] text-rose-400 pt-1">{confirmados.filter(p => !p.paid).length} Pendentes</p>
</div>
</div>

<div className="bg-slate-900 p-3.5 rounded-2xl border border-amber-500/30 space-y-2.5 shadow-xl">
<div className="flex justify-between items-center">
<h3 className="text-xs font-black text-slate-200 uppercase tracking-wide">Listas Oficiais para WhatsApp</h3>
<span className="text-[10px] bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-full font-bold">{confirmados.length} confirmados</span>
</div>
<div className="grid grid-cols-2 gap-2 pt-1">
<button onClick={handleGerarListaPortaria} className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs py-3 px-3 rounded-xl font-bold flex items-center justify-center gap-2 border border-slate-700 active:scale-95 transition">
<CopyIcon className="w-4 h-4 text-amber-400" /> Lista Portaria (CPF)
</button>
<button onClick={handleGerarListaPresencaPix} className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs py-3 px-3 rounded-xl font-black flex items-center justify-center gap-2 active:scale-95 transition shadow-lg shadow-emerald-600/30">
<CopyIcon className="w-4 h-4" /> Presença & Pix
</button>
</div>
</div>

<div className="space-y-2 pt-1">
<div className="flex justify-between items-center">
<h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Elenco ({players.length} Atletas)</h3>
<button onClick={() => setActiveTab('cadastro')} className="text-[10px] text-amber-400 font-bold hover:underline">+ Novo / Atualizar</button>
</div>

<div className="space-y-2">
{players.map(p => {
const isPresente = presentPlayerIds.includes(p.id);
return (
<div key={p.id} className={`p-3 rounded-2xl border transition flex items-center justify-between gap-2 ${isPresente ? 'bg-slate-900 border-amber-500/40 shadow-sm' : 'bg-slate-950/70 border-slate-800 opacity-60'}`}>
<div className="flex items-center gap-2.5 min-w-0">
<button onClick={() => setPresentPlayerIds(prev => prev.includes(p.id) ? prev.filter(x => x !== p.id) : [...prev, p.id])} className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 border transition ${isPresente ? 'bg-amber-400 border-amber-300 text-slate-950' : 'bg-slate-900 border-slate-700 text-transparent'}`}>
<CheckIcon className="w-4 h-4 font-black stroke-[3]" />
</button>
<div className="min-w-0">
<p className="font-bold text-xs text-slate-100 truncate flex items-center gap-1.5">
<span>{p.name}</span>
{p.isGoleiro ? <span className="text-[9px] bg-cyan-500/20 text-cyan-400 px-1.5 py-0.5 rounded font-bold font-mono">GOL</span> : <span className="text-[9px] bg-slate-800 text-slate-400 px-1 py-0.5 rounded font-mono">{p.pos}</span>}
</p>
<p className="text-[10px] text-slate-400 truncate">CPF: {p.cpf.padStart(11, '0').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")}</p>
</div>
</div>

<div className="flex items-center gap-1.5 shrink-0">
<select
value={p.modalidade}
onChange={(e) => handleUpdateAtletaStatus(p, 'modalidade', e.target.value)}
className={`text-[10px] font-bold px-2 py-1.5 rounded-lg border outline-none bg-slate-950 cursor-pointer ${p.modalidade === 'mensalista' ? 'border-cyan-500/50 text-cyan-400' : p.modalidade === 'combo' ? 'border-amber-500/50 text-amber-300' : 'border-slate-700 text-slate-300'}`}
>
<option value="avulso">⚽ Avulso (R$ {financeConfig.valorJogo})</option>
{financeConfig.pacoteEvento === 'jogo_churrasco' && <option value="combo">🥩 Combo (R$ {totalCombo})</option>}
<option value="mensalista">💳 Mensalista</option>
</select>

<button onClick={() => handleUpdateAtletaStatus(p, 'paid', !p.paid)} className={`px-2.5 py-1.5 rounded-lg text-[11px] font-black border transition ${p.paid ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' : 'bg-rose-500/20 text-rose-400 border-rose-500/40'}`}>
{p.paid ? '💰 Pago' : '⏳ Pend.'}
</button>
</div>
</div>
);
})}
</div>
</div>
</>
)}

{/* 2. ABA CADASTRO COM AUTO-PREENCHIMENTO E MODO DE EDIÇÃO */}
{activeTab === 'cadastro' && (
<form onSubmit={handleCadastrarNovoAtleta} className="space-y-4 animate-in fade-in">
<div>
<h2 className="text-base font-black text-amber-400 flex items-center gap-1.5">
<UserPlusIcon className="w-4 h-4 text-amber-400" /> {isEditingExistingPlayer ? 'Editar Atleta Cadastrado' : 'Cadastro de Novo Atleta'}
</h2>
<p className="text-[11px] text-slate-400">
{isEditingExistingPlayer ? 'CPF localizado na base. Altere os campos abaixo para atualizar.' : 'Digite o CPF para consultar se o atleta já existe ou preencha os dados do novo perfil.'}
</p>
</div>

{isEditingExistingPlayer && (
<div className="bg-cyan-500/10 border border-cyan-500/40 p-3 rounded-2xl flex items-center justify-between gap-2 text-xs text-cyan-300">
<div className="flex items-center gap-2">
<EditIcon className="w-4 h-4 text-cyan-400 shrink-0" />
<span><strong>Modo de Edição Ativo:</strong> Atualizando dados de <strong>{newPlayerData.name}</strong>.</span>
</div>
</div>
)}

<div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-3 shadow-xl">
<div className="grid grid-cols-2 gap-2">
<div>
<label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">CPF do Atleta *</label>
<input
type="text"
placeholder="000.000.000-00"
required
value={newPlayerData.cpf}
onChange={handleCpfInputChange}
className="w-full bg-slate-950 border border-slate-800 text-xs p-3 rounded-xl text-amber-400 font-mono font-bold focus:outline-none focus:border-amber-400"
/>
</div>
<div>
<label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Celular / WhatsApp *</label>
<input
type="text"
placeholder="(00) 00000-0000"
required
value={newPlayerData.phone}
onChange={e => setNewPlayerData({ ...newPlayerData, phone: e.target.value })}
className="w-full bg-slate-950 border border-slate-800 text-xs p-3 rounded-xl text-slate-200 focus:outline-none focus:border-amber-400 font-mono"
/>
</div>
</div>

<div>
<label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Nome Completo *</label>
<input
type="text"
placeholder="Nome do Atleta *"
required
value={newPlayerData.name}
onChange={e => setNewPlayerData({ ...newPlayerData, name: e.target.value })}
className="w-full bg-slate-950 border border-slate-800 text-xs p-3 rounded-xl text-slate-200 focus:outline-none focus:border-amber-400"
/>
</div>

<div className="grid grid-cols-2 gap-2">
<div>
<label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Posição Principal</label>
<select
value={newPlayerData.pos}
onChange={e => setNewPlayerData({ ...newPlayerData, pos: e.target.value, isGoleiro: e.target.value === 'GOL' })}
className="w-full bg-slate-950 border border-slate-800 text-xs p-3 rounded-xl text-amber-400 font-bold focus:outline-none"
>
<option value="ATA">Atacante (ATA)</option>
<option value="MID">Meio-Campo (MID)</option>
<option value="DEF">Defensor (DEF)</option>
<option value="GOL">Goleiro (GOL)</option>
</select>
</div>

<div>
<label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Pacote do Atleta</label>
<select
value={newPlayerData.modalidade}
onChange={e => setNewPlayerData({ ...newPlayerData, modalidade: e.target.value })}
className="w-full bg-slate-950 border border-slate-800 text-xs p-3 rounded-xl text-slate-200 font-bold focus:outline-none"
>
<option value="combo">🥩 Combo Churras</option>
<option value="avulso">⚽ Apenas Jogo</option>
<option value="mensalista">💳 Mensalista</option>
</select>
</div>
</div>

<div className="bg-slate-950 p-3 rounded-xl border border-amber-500/40 flex justify-between items-center shadow-inner">
<div>
<span className="text-xs text-slate-300 font-bold block">OVR Geral Calculado:</span>
<span className="text-[10px] text-slate-500">Média Ponderada Oficial</span>
</div>
<span className="text-3xl font-black text-amber-400 font-mono">{calculateOvrFromMicro(newPlayerData.micro)}</span>
</div>

{/* RESTAURAÇÃO: Todos os 11 Micro-atributos Sliders divididos em 4 blocos */}
<div className="space-y-3 pt-1">

{/* 1. Físico */}
<div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
<span className="text-[11px] font-black text-amber-400 uppercase">1. Físico (25%):</span>
{[{ key: 'folego', label: 'Fôlego' }, { key: 'velocidade', label: 'Velocidade' }, { key: 'forca', label: 'Força' }].map(attr => (
<div key={attr.key} className="flex items-center gap-2 text-xs">
<span className="w-36 text-slate-400 text-[10px] truncate">{attr.label}</span>
<input type="range" min="1" max="99" value={newPlayerData.micro[attr.key]} onChange={e => setNewPlayerData({ ...newPlayerData, micro: { ...newPlayerData.micro, [attr.key]: parseInt(e.target.value) } })} className="flex-1 accent-amber-400 h-1.5 bg-slate-800 rounded cursor-pointer" />
<span className="w-6 text-right font-mono font-bold text-amber-400">{newPlayerData.micro[attr.key]}</span>
</div>
))}
</div>

{/* 2. Técnico */}
<div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
<span className="text-[11px] font-black text-amber-400 uppercase">2. Técnico (35%):</span>
{[{ key: 'controle', label: 'Controle' }, { key: 'passe', label: 'Passe' }, { key: 'finalizacao', label: 'Finalização' }, { key: 'marcacao', label: 'Marcação' }].map(attr => (
<div key={attr.key} className="flex items-center gap-2 text-xs">
<span className="w-36 text-slate-400 text-[10px] truncate">{attr.label}</span>
<input type="range" min="1" max="99" value={newPlayerData.micro[attr.key]} onChange={e => setNewPlayerData({ ...newPlayerData, micro: { ...newPlayerData.micro, [attr.key]: parseInt(e.target.value) } })} className="flex-1 accent-amber-400 h-1.5 bg-slate-800 rounded cursor-pointer" />
<span className="w-6 text-right font-mono font-bold text-amber-400">{newPlayerData.micro[attr.key]}</span>
</div>
))}
</div>

{/* 3. Tático */}
<div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
<span className="text-[11px] font-black text-amber-400 uppercase">3. Tático (25%):</span>
{[{ key: 'posicionamento', label: 'Posicionamento' }, { key: 'visao', label: 'Visão de Jogo' }, { key: 'raca', label: 'Raça / Vontade' }].map(attr => (
<div key={attr.key} className="flex items-center gap-2 text-xs">
<span className="w-36 text-slate-400 text-[10px] truncate">{attr.label}</span>
<input type="range" min="1" max="99" value={newPlayerData.micro[attr.key]} onChange={e => setNewPlayerData({ ...newPlayerData, micro: { ...newPlayerData.micro, [attr.key]: parseInt(e.target.value) } })} className="flex-1 accent-amber-400 h-1.5 bg-slate-800 rounded cursor-pointer" />
<span className="w-6 text-right font-mono font-bold text-amber-400">{newPlayerData.micro[attr.key]}</span>
</div>
))}
</div>

{/* 4. Comportamental */}
<div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
<span className="text-[11px] font-black text-amber-400 uppercase">4. Comportamental (15%):</span>
{[{ key: 'presenca', label: 'Presença' }, { key: 'pontualidade', label: 'Pontualidade' }, { key: 'pagamento', label: 'Pagamento' }, { key: 'convivencia', label: 'Convivência' }].map(attr => (
<div key={attr.key} className="flex items-center gap-2 text-xs">
<span className="w-36 text-slate-400 text-[10px] truncate">{attr.label}</span>
<input type="range" min="1" max="99" value={newPlayerData.micro[attr.key]} onChange={e => setNewPlayerData({ ...newPlayerData, micro: { ...newPlayerData.micro, [attr.key]: parseInt(e.target.value) } })} className="flex-1 accent-amber-400 h-1.5 bg-slate-800 rounded cursor-pointer" />
<span className="w-6 text-right font-mono font-bold text-amber-400">{newPlayerData.micro[attr.key]}</span>
</div>
))}
</div>

</div>

<button
type="submit"
className={`w-full font-black py-3.5 rounded-xl text-xs uppercase tracking-wider shadow-lg active:scale-95 transition ${
isEditingExistingPlayer
? 'bg-gradient-to-r from-cyan-500 to-cyan-600 text-slate-950 shadow-cyan-500/20'
: 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-amber-500/20'
}`}
>
{isEditingExistingPlayer ? '🔄 Atualizar Cadastro do Atleta' : 'Salvar Novo Atleta no Elenco'}
</button>
</div>
</form>
)}

{/* 3. ABA SORTEIO */}
{activeTab === 'sorteio' && (
<div className="space-y-4 animate-in fade-in">
{!isListaFechada ? (
<div className="bg-slate-900 border border-amber-500/50 p-6 rounded-3xl text-center space-y-4 shadow-2xl my-6">
<div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400"><LockIcon className="w-8 h-8" /></div>
<div className="space-y-1.5">
<h3 className="text-base font-black text-amber-400 uppercase tracking-wide">Sorteio Bloqueado pela Diretoria</h3>
<p className="text-xs text-slate-300 leading-relaxed max-w-xs mx-auto">A lista ainda está aberta. Feche a lista de presença na aba <strong>Diretoria</strong> para habilitar o balanceamento e sorteio dos times.</p>
</div>
<button onClick={() => setActiveTab('diretoria')} className="w-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black py-3.5 rounded-xl text-xs uppercase tracking-wider shadow-lg active:scale-95 transition flex items-center justify-center gap-2">
<ShieldIcon className="w-4 h-4" /><span>Ir para a Diretoria e Fechar Lista</span>
</button>
</div>
) : (
<div className="space-y-4">
<div className="flex justify-between items-center">
<div>
<h2 className="text-base font-black text-emerald-400 flex items-center gap-1.5"><UsersIcon className="w-4 h-4" /> Sorteio Inteligente</h2>
<p className="text-[11px] text-slate-400">{confirmados.length} Atletas • Balanceamento por Posição & OVR</p>
</div>
<button onClick={handleSortearTimesAvancado} className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs px-3.5 py-2 rounded-xl flex items-center gap-1 shadow-lg shadow-emerald-500/20 active:scale-95 transition">
<RefreshCwIcon className="w-3.5 h-3.5" /> Sortear
</button>
</div>

<div className="bg-slate-900 border border-slate-800 p-3.5 rounded-2xl space-y-3 shadow-xl">
<div className="flex justify-between items-center border-b border-slate-800 pb-2">
<div className="flex items-center gap-1.5"><EditIcon className="w-4 h-4 text-amber-400" /><h3 className="text-xs font-black text-slate-200 uppercase tracking-wide">Nomes das Equipes</h3></div>
<button onClick={handleSalvarNomesTimes} className="bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs px-3 py-1.5 rounded-xl shadow-md active:scale-95 transition flex items-center gap-1">
<CheckIcon className="w-3.5 h-3.5 stroke-[3]" /><span>OK / Salvar</span>
</button>
</div>
<div className="grid grid-cols-2 gap-2">
{['verde', 'azul', 'amarelo', 'vermelho'].slice(0, numTeams).map(color => (
<div key={color}>
<label className="text-[9px] font-black uppercase tracking-wider block mb-1 text-slate-400">Equipe {color.toUpperCase()}</label>
<input type="text" value={editingTeamNames[color]} onChange={(e) => setEditingTeamNames({ ...editingTeamNames, [color]: e.target.value })} placeholder={`Ex: Colete ${color}`} className="w-full bg-slate-950 border border-slate-800 focus:border-amber-400 text-xs font-bold text-slate-100 px-3 py-2 rounded-xl outline-none" />
</div>
))}
</div>
</div>

<div className="bg-gradient-to-br from-slate-900 to-slate-950 p-3.5 rounded-2xl border border-cyan-500/40 shadow-xl space-y-3">
<div className="flex justify-between items-center border-b border-slate-800 pb-2">
<div className="flex items-center gap-2"><span className="text-xl">🧤</span><div><h3 className="text-xs font-black text-cyan-400 uppercase">Aquecimento dos Goleiros</h3><p className="text-[10px] text-slate-400">Compensa goleiros dando melhores de linha</p></div></div>
<button onClick={() => setShowGuestGkModal(true)} className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold text-[10px] px-2 py-1 rounded-lg active:scale-95 transition flex items-center gap-1"><UserPlusIcon className="w-3 h-3" /> + Convidado</button>
</div>
<div className="space-y-2">
{players.filter(p => p.isGoleiro && presentPlayerIds.includes(p.id)).map(gk => {
const currentNota = goalkeeperRatings[gk.id] || 7;
return (
<div key={gk.id} className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex items-center gap-3">
<div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-500/50 flex items-center justify-center font-black text-cyan-400 text-xs shrink-0">GOL</div>
<div className="flex-1 min-w-0">
<div className="flex justify-between items-center mb-1">
<span className="text-xs font-bold text-slate-200 truncate">{gk.name}</span>
<span className="text-xs font-black font-mono text-cyan-400">Nota {currentNota}/10 {currentNota >= 9 ? '🔥 Paredão' : currentNota <= 4 ? '⚠️ Frango' : '🧤 Seguro'}</span>
</div>
<input type="range" min="1" max="10" value={currentNota} onChange={(e) => setGoalkeeperRatings({ ...goalkeeperRatings, [gk.id]: parseInt(e.target.value) })} className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer" />
</div>
</div>
);
})}
</div>
</div>

{selectedForSwap && (
<div className="bg-amber-500/20 border border-amber-400/50 p-3 rounded-2xl flex justify-between items-center text-xs animate-pulse">
<span className="text-amber-300 font-bold">🔄 Trocando: <strong>{selectedForSwap.player.name}</strong>. Toque no atleta do outro time!</span>
<button onClick={() => setSelectedForSwap(null)} className="text-[10px] bg-slate-900 text-slate-300 px-2 py-1 rounded-lg border border-slate-700">Cancelar</button>
</div>
)}

<div className="space-y-3">
{['verde', 'azul', 'amarelo', 'vermelho'].slice(0, numTeams).map(colorKey => {
const teamList = teams[colorKey] || [];
const avgOvr = teamList.length ? (teamList.reduce((a, b) => a + b.ovr, 0) / teamList.length).toFixed(1) : '0';
return (
<div key={colorKey} className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800 space-y-2.5 shadow-lg">
<div className="flex justify-between items-center border-b border-slate-800 pb-2">
<span className="font-black text-xs text-amber-400 uppercase tracking-wide">{teamNames[colorKey]}</span>
<span className="text-[10px] bg-slate-950 text-slate-300 px-2 py-0.5 rounded-md font-mono border border-slate-800">OVR Médio: <strong className="text-amber-400">{avgOvr}</strong></span>
</div>
<div className="grid grid-cols-2 gap-1.5">
{teamList.map(p => {
const isSelected = selectedForSwap && selectedForSwap.player.id === p.id;
return (
<button key={p.id} onClick={() => handleSelectForSwap(colorKey, p)} className={`p-2 rounded-xl border text-left text-xs transition flex justify-between items-center ${isSelected ? 'bg-amber-400 text-slate-950 font-black border-amber-300 scale-95 shadow-md' : 'bg-slate-950 hover:bg-slate-800 border-slate-800 text-slate-200'}`}>
<div className="min-w-0 pr-1"><p className="font-bold truncate text-[11px]">{p.name}</p><p className="text-[9px] text-slate-400 font-mono">{p.pos} • {p.ovr}</p></div>
<ArrowLeftRightIcon className="w-3.5 h-3.5 shrink-0 opacity-40 hover:opacity-100" />
</button>
);
})}
</div>
</div>
);
})}
</div>

<button onClick={() => setActiveTab('beira')} className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-black py-3.5 rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/30 active:scale-95 transition flex items-center justify-center gap-2">
<ActivityIcon className="w-4 h-4" /><span>Ir para a Beira de Quadra (Iniciar Jogo)</span>
</button>
</div>
)}
</div>
)}

{/* 4. ABA BEIRA DE QUADRA */}
{activeTab === 'beira' && (
<div className="space-y-4 animate-in fade-in">
{!isListaFechada ? (
<div className="bg-slate-900 border border-amber-500/50 p-6 rounded-3xl text-center space-y-4 shadow-2xl my-6">
<div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400"><LockIcon className="w-8 h-8" /></div>
<div className="space-y-1.5"><h3 className="text-base font-black text-amber-400 uppercase tracking-wide">Quadra Bloqueada</h3><p className="text-xs text-slate-300 leading-relaxed max-w-xs mx-auto">Feche a lista de presença na aba <strong>Diretoria</strong> e realize o sorteio dos times para liberar o placar.</p></div>
<button onClick={() => setActiveTab('diretoria')} className="w-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black py-3.5 rounded-xl text-xs uppercase tracking-wider shadow-lg active:scale-95 transition flex items-center justify-center gap-2">
<ShieldIcon className="w-4 h-4" /><span>Ir para a Diretoria</span>
</button>
</div>
) : (
<div className="space-y-4">
<div className="bg-slate-900 p-2.5 rounded-2xl border border-slate-800 flex justify-between items-center text-xs">
<div className="flex items-center gap-2 min-w-0">
<span className="text-slate-400 text-[10px] uppercase font-bold">Em Jogo:</span>
<span className="font-black text-emerald-400 uppercase truncate">{teamNames[playingTeams.teamA]}</span>
<span className="text-slate-600 font-bold">vs</span>
<span className="font-black text-cyan-400 uppercase truncate">{teamNames[playingTeams.teamB]}</span>
</div>
{queueTeams.length > 0 && <span className="text-[10px] bg-slate-950 text-amber-400 font-bold px-2 py-0.5 rounded border border-slate-800 shrink-0">Próximo: {teamNames[queueTeams[0]]}</span>}
</div>

<div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 p-4 rounded-3xl border border-amber-500/30 shadow-2xl space-y-4 text-center">
<div className="space-y-1">
<div className="font-mono text-5xl font-black text-amber-400 tracking-widest drop-shadow-[0_0_15px_rgba(245,158,11,0.3)]">{formatTime(timer)}</div>
<div className="flex justify-center gap-2 pt-1">
<button onClick={() => setIsTimerRunning(!isTimerRunning)} className={`px-5 py-2.5 rounded-full text-xs font-black flex items-center gap-1.5 transition active:scale-95 shadow-lg ${isTimerRunning ? 'bg-amber-400 text-slate-950' : 'bg-emerald-500 text-slate-950 shadow-emerald-500/30'}`}>
{isTimerRunning ? <PauseIcon className="w-3.5 h-3.5" /> : <PlayIcon className="w-3.5 h-3.5" />}
<span>{isTimerRunning ? 'PAUSAR' : 'INICIAR TEMPO'}</span>
</button>
<button onClick={() => { setIsTimerRunning(false); setTimer(0); }} className="p-2.5 bg-slate-800 text-slate-400 rounded-full hover:text-white border border-slate-700 active:scale-95 transition"><RotateCcwIcon className="w-4 h-4" /></button>
</div>
</div>

<div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800">
<div className="bg-slate-950 p-3 rounded-2xl border border-emerald-500/30 flex flex-col items-center shadow-inner">
<span className="text-[11px] font-black text-emerald-400 uppercase truncate max-w-full">{teamNames[playingTeams.teamA]}</span>
<span className="text-5xl font-black font-mono my-1 text-white">{score.teamA}</span>
<div className="flex gap-1.5 w-full mt-2">
<button onClick={() => handleDiminuirGol('teamA')} className="w-9 h-10 bg-slate-900 hover:bg-rose-950/60 hover:text-rose-400 text-slate-400 font-black rounded-xl border border-slate-800 flex items-center justify-center active:scale-95 transition"><MinusCircleIcon className="w-4 h-4" /></button>
<button onClick={() => handleOpenGoalModal('teamA')} className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-2.5 rounded-xl text-xs active:scale-95 transition shadow-md flex items-center justify-center gap-1"><span>+ GOL</span></button>
</div>
</div>
<div className="bg-slate-950 p-3 rounded-2xl border border-cyan-500/30 flex flex-col items-center shadow-inner">
<span className="text-[11px] font-black text-cyan-400 uppercase truncate max-w-full">{teamNames[playingTeams.teamB]}</span>
<span className="text-5xl font-black font-mono my-1 text-white">{score.teamB}</span>
<div className="flex gap-1.5 w-full mt-2">
<button onClick={() => handleDiminuirGol('teamB')} className="w-9 h-10 bg-slate-900 hover:bg-rose-950/60 hover:text-rose-400 text-slate-400 font-black rounded-xl border border-slate-800 flex items-center justify-center active:scale-95 transition"><MinusCircleIcon className="w-4 h-4" /></button>
<button onClick={() => handleOpenGoalModal('teamB')} className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black py-2.5 rounded-xl text-xs active:scale-95 transition shadow-md flex items-center justify-center gap-1"><span>+ GOL</span></button>
</div>
</div>
</div>

<button onClick={() => {
if (timer === 0 && score.teamA === 0 && score.teamB === 0) { triggerToast("Inicie a partida ou registre gols para encerrar."); return; }
setIsTimerRunning(false); setShowFinishModal(true);
}} className="w-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-bold text-xs py-3 rounded-xl active:scale-95 transition">
🏁 Encerrar Partida & Liberar Resenha no Portal
</button>
</div>

<div className="bg-slate-900/90 p-3.5 rounded-2xl border border-slate-800 space-y-2">
<h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5"><ActivityIcon className="w-3.5 h-3.5 text-amber-400" /> Histórico de Gols da Partida</h3>
{matchLogs.length === 0 ? <p className="text-xs text-slate-600 italic py-2 text-center">Nenhum gol registrado ainda.</p> : (
<div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
{matchLogs.map(log => (
<div key={log.id} className="bg-slate-950 p-2 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
<div className="flex items-center gap-2"><span className="font-mono text-amber-400 font-bold">{log.time}'</span><span className="font-bold text-slate-200">{log.player}</span></div>
<span className="text-[10px] text-slate-400 uppercase font-bold bg-slate-900 px-2 py-0.5 rounded">{log.teamName}</span>
</div>
))}
</div>
)}
</div>
</div>
)}
</div>
)}

{/* 5. ABA PORTAL DO ATLETA */}
{activeTab === 'portal' && (
<div className="space-y-4 animate-in fade-in">
<div className="flex items-center justify-between bg-slate-900 p-2.5 rounded-2xl border border-slate-800 text-xs">
<span className="text-slate-400 font-bold">Ver Cartinha de:</span>
<select value={selectedPlayerForPortal?.id || ''} onChange={(e) => {
const found = players.find(p => String(p.id) === String(e.target.value));
if (found) { setSelectedPlayerForPortal(found); setIsCardFlipped(false); }
}} className="bg-slate-950 text-amber-400 font-bold py-1.5 px-3 rounded-xl border border-amber-500/30 focus:outline-none text-xs">
{players.map(p => <option key={p.id} value={p.id}>{p.name} (OVR {p.ovr} • {p.pos})</option>)}
</select>
</div>

{selectedPlayerForPortal && (
<>
<div className="text-center">
<span className="text-[10px] bg-amber-400/10 text-amber-300 border border-amber-400/30 px-3 py-1 rounded-full font-bold inline-flex items-center gap-1.5 shadow-sm">
<span>👆</span> Toque na cartinha para {isCardFlipped ? 'ver a frente' : 'girar em 3D e ver o Resumo Macro'}
</span>
</div>

<div className="flex justify-center my-1 card-3d-perspective min-h-[470px]">
<div className={`card-3d-inner cursor-pointer select-none filter drop-shadow-[0_22px_35px_rgba(0,0,0,0.95)] drop-shadow-[0_0_25px_rgba(234,179,8,0.3)] ${isCardFlipped ? 'flipped' : ''}`} onClick={() => setIsCardFlipped(!isCardFlipped)}>

<svg className="absolute w-0 h-0" aria-hidden="true">
<defs>
<clipPath id="totyShieldClip" clipPathUnits="userSpaceOnUse">
<path d="M 150 5 C 185 5 238 15 268 32 C 288 42 295 56 295 72 L 295 348 C 295 388 238 430 150 460 C 62 430 5 388 5 348 L 5 72 C 5 56 12 42 32 32 C 62 15 115 5 150 5 Z" />
</clipPath>
<linearGradient id="goldGradLight" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#fff8db" /><stop offset="30%" stopColor="#f5d77f" /><stop offset="60%" stopColor="#c59328" /><stop offset="100%" stopColor="#875807" /></linearGradient>
<linearGradient id="goldGrad3D" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#fffae0" /><stop offset="18%" stopColor="#d8ab3e" /><stop offset="50%" stopColor="#8c5b05" /><stop offset="85%" stopColor="#f3d274" /><stop offset="100%" stopColor="#5c3800" /></linearGradient>
<linearGradient id="goldInnerRim" x1="100%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#fff6c7" /><stop offset="50%" stopColor="#aa7c1e" /><stop offset="100%" stopColor="#f7dc8d" /></linearGradient>
</defs>
</svg>

{/* FACE FRONTAL */}
<div id="toty-card-render-front" className="card-face">
<div className="absolute inset-0 bg-gradient-to-b from-[#09173b] via-[#04091a] to-[#020510] flex flex-col justify-between p-3.5 pt-5 pb-3 overflow-hidden" style={{ clipPath: 'url(#totyShieldClip)' }}>
<div className="absolute inset-0 bg-[radial-gradient(#e5c062_1.3px,transparent_1.3px)] [background-size:12px_12px] opacity-15 pointer-events-none" />
<div className="absolute -inset-full bg-gradient-to-tr from-transparent via-[#ffd700]/10 to-transparent rotate-45 pointer-events-none" />

<div className="flex justify-between items-start z-10 pt-1 px-1">
<div className="flex flex-col items-center w-16">
<span className="text-[3.4rem] font-black text-[#fef0cd] tracking-tighter leading-none drop-shadow-[0_4px_10px_rgba(0,0,0,0.95)]">{selectedPlayerForPortal.ovr}</span>
<span className="text-sm font-black text-[#f3cf73] tracking-widest -mt-0.5 drop-shadow">{selectedPlayerForPortal.pos}</span>
<div className="my-1.5 rounded-[2px] border border-[#e5c062]/80 overflow-hidden shadow-md flex items-center justify-center"><BrazilFlagIcon className="w-8 h-5" /></div>
<div className="mt-0.5"><ClubCrestIcon className="w-8 h-9" /></div>
</div>

<div className="relative group">
<div className="w-32 h-32 rounded-full bg-gradient-to-b from-blue-900/60 to-slate-950 border-[2.5px] border-[#f6ce65] flex items-center justify-center shadow-[0_0_25px_rgba(246,206,101,0.4)] relative overflow-hidden mt-1 mr-1">
{selectedPlayerForPortal.photo ? (
<img src={selectedPlayerForPortal.photo} alt={selectedPlayerForPortal.name} className="w-full h-full object-cover object-top" />
) : <span className="text-6xl drop-shadow-lg">⚽</span>}
<label onClick={(e) => e.stopPropagation()} className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-amber-300 text-[10px] font-black cursor-pointer transition">
<CameraIcon className="w-5 h-5 mb-0.5" /><span>Trocar Foto</span>
<input type="file" accept="image/*" className="hidden" onChange={(e) => handlePhotoUpload(e, selectedPlayerForPortal.id)} />
</label>
</div>
<label onClick={(e) => e.stopPropagation()} title="Carregar foto do atleta" className="absolute -bottom-1 -right-1 bg-amber-400 text-slate-950 p-1.5 rounded-full border border-amber-300 shadow-md cursor-pointer hover:bg-amber-300 active:scale-95 transition">
<CameraIcon className="w-3.5 h-3.5" />
<input type="file" accept="image/*" className="hidden" onChange={(e) => handlePhotoUpload(e, selectedPlayerForPortal.id)} />
</label>
</div>
</div>

<div className="z-10 my-0.5 bg-gradient-to-r from-[#875807] via-[#fff1b8] to-[#875807] text-slate-950 text-center py-1 font-black text-base uppercase tracking-widest rounded border-y border-[#ffffff] mx-1">{selectedPlayerForPortal.name}</div>

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
return <span key={key} className="text-[11px] bg-slate-950/90 border border-amber-500/50 px-2 py-0.5 rounded-full font-bold">{BADGES_CONFIG[key]?.emoji} x{count}</span>;
})}
</div>
<div className="text-center z-10 text-[9px] text-[#f6ce65] uppercase tracking-widest font-black pb-3">FUTEBOL RAIZ • TOTY</div>
</div>

<svg className="absolute inset-0 w-full h-full pointer-events-none z-20" viewBox="0 0 300 465" fill="none">
<path d="M 150 5 C 185 5 238 15 268 32 C 288 42 295 56 295 72 L 295 348 C 295 388 238 430 150 460 C 62 430 5 388 5 348 L 5 72 C 5 56 12 42 32 32 C 62 15 115 5 150 5 Z" stroke="url(#goldGrad3D)" strokeWidth="5" />
<path d="M 150 10 C 182 10 231 19 260 35 C 278 44 286 56 286 70 L 286 344 C 286 380 232 420 150 449 C 68 420 14 380 14 344 L 14 70 C 14 56 22 44 40 35 C 69 19 118 10 150 10 Z" stroke="url(#goldInnerRim)" strokeWidth="1.2" />
</svg>
<div className="absolute bottom-1 left-1/2 -translate-x-1/2 z-30 pointer-events-none"><WingedShieldTipIcon className="w-8 h-4" /></div>
</div>

{/* VERSO DA CARTINHA */}
<div className="card-face card-back">
<div className="absolute inset-0 bg-gradient-to-b from-[#09173b] via-[#050d24] to-[#020510] flex flex-col justify-between p-4 pt-5 pb-3 overflow-hidden text-left" style={{ clipPath: 'url(#totyShieldClip)' }}>
<div className="absolute inset-0 bg-[radial-gradient(#e5c062_1.3px,transparent_1.3px)] [background-size:12px_12px] opacity-15 pointer-events-none" />
<div className="z-10 border-b border-amber-500/40 pb-2 text-center">
<span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest block">Resumo Macro da Temporada</span>
<h4 className="text-base font-black text-white truncate">{selectedPlayerForPortal.name}</h4>
</div>
<div className="grid grid-cols-3 gap-1.5 z-10 my-1">
<div className="bg-slate-950/90 border border-amber-500/40 p-2 rounded-xl text-center"><span className="text-[9px] text-slate-400 font-bold block uppercase">Gols</span><span className="text-xl font-black text-amber-400 font-mono leading-tight">⚽ {selectedPlayerForPortal.totalGoals || 0}</span></div>
<div className="bg-slate-950/90 border border-slate-800 p-2 rounded-xl text-center"><span className="text-[9px] text-slate-400 font-bold block uppercase">Jogos</span><span className="text-xl font-black text-emerald-400 font-mono leading-tight">{selectedPlayerForPortal.partidasJogadas || 8}</span></div>
<div className="bg-slate-950/90 border border-slate-800 p-2 rounded-xl text-center"><span className="text-[9px] text-slate-400 font-bold block uppercase">Aprov.</span><span className="text-xl font-black text-cyan-400 font-mono leading-tight">{Math.round(((selectedPlayerForPortal.vitorias || 5) / (selectedPlayerForPortal.partidasJogadas || 8)) * 100)}%</span></div>
</div>

<div className="space-y-1.5 z-10 bg-slate-950/90 p-2.5 rounded-xl border border-amber-500/30">
<span className="text-[9px] font-black uppercase text-amber-400 tracking-wider block mb-1">Pilares de Habilidade:</span>
<div>
<div className="flex justify-between text-[10px] font-bold"><span className="text-slate-300">Físico</span><span className="text-amber-400 font-mono">{Math.round(((selectedPlayerForPortal.micro?.folego || 75) + (selectedPlayerForPortal.micro?.velocidade || 75) + (selectedPlayerForPortal.micro?.forca || 75)) / 3)}</span></div>
<div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden mt-0.5"><div className="bg-gradient-to-r from-amber-500 to-amber-400 h-full rounded-full" style={{ width: `${Math.round(((selectedPlayerForPortal.micro?.folego || 75) + (selectedPlayerForPortal.micro?.velocidade || 75) + (selectedPlayerForPortal.micro?.forca || 75)) / 3)}%` }} /></div>
</div>
<div>
<div className="flex justify-between text-[10px] font-bold"><span className="text-slate-300">Técnico</span><span className="text-amber-400 font-mono">{Math.round(((selectedPlayerForPortal.micro?.controle || 75) + (selectedPlayerForPortal.micro?.passe || 75) + (selectedPlayerForPortal.micro?.finalizacao || 75) + (selectedPlayerForPortal.micro?.marcacao || 75)) / 4)}</span></div>
<div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden mt-0.5"><div className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-full rounded-full" style={{ width: `${Math.round(((selectedPlayerForPortal.micro?.controle || 75) + (selectedPlayerForPortal.micro?.passe || 75) + (selectedPlayerForPortal.micro?.finalizacao || 75) + (selectedPlayerForPortal.micro?.marcacao || 75)) / 4)}%` }} /></div>
</div>
<div>
<div className="flex justify-between text-[10px] font-bold"><span className="text-slate-300">Tático</span><span className="text-amber-400 font-mono">{Math.round(((selectedPlayerForPortal.micro?.posicionamento || 75) + (selectedPlayerForPortal.micro?.visao || 75) + (selectedPlayerForPortal.micro?.raca || 75)) / 3)}</span></div>
<div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden mt-0.5"><div className="bg-gradient-to-r from-cyan-500 to-cyan-400 h-full rounded-full" style={{ width: `${Math.round(((selectedPlayerForPortal.micro?.posicionamento || 75) + (selectedPlayerForPortal.micro?.visao || 75) + (selectedPlayerForPortal.micro?.raca || 75)) / 3)}%` }} /></div>
</div>
</div>

<div className="z-10 bg-slate-950/90 p-2 rounded-xl border border-slate-800 space-y-1">
<span className="text-[9px] font-black uppercase text-slate-400 tracking-wider block">Reconhecimento da Turma:</span>
<div className="grid grid-cols-2 gap-1 text-[10px]">
<div className="flex items-center gap-1 text-emerald-400 font-bold"><span>👑 Deitou:</span><span className="text-white font-mono">{selectedPlayerForPortal.selos?.deitou || 0}</span></div>
<div className="flex items-center gap-1 text-emerald-400 font-bold"><span>👔 Terno:</span><span className="text-white font-mono">{selectedPlayerForPortal.selos?.terno || 0}</span></div>
<div className="flex items-center gap-1 text-emerald-400 font-bold"><span>🌧️ Chover:</span><span className="text-white font-mono">{selectedPlayerForPortal.selos?.chover || 0}</span></div>
<div className="flex items-center gap-1 text-rose-400 font-bold"><span>🐟 Bagre:</span><span className="text-white font-mono">{selectedPlayerForPortal.selos?.bagre || 0}</span></div>
</div>
</div>
<div className="text-center z-10 text-[9px] text-[#f6ce65] uppercase tracking-widest font-black pb-3">TOQUE NOVAMENTE PARA VIRAR</div>
</div>
<svg className="absolute inset-0 w-full h-full pointer-events-none z-20" viewBox="0 0 300 465" fill="none">
<path d="M 150 5 C 185 5 238 15 268 32 C 288 42 295 56 295 72 L 295 348 C 295 388 238 430 150 460 C 62 430 5 388 5 348 L 5 72 C 5 56 12 42 32 32 C 62 15 115 5 150 5 Z" stroke="url(#goldGrad3D)" strokeWidth="5" />
<path d="M 150 10 C 182 10 231 19 260 35 C 278 44 286 56 286 70 L 286 344 C 286 380 232 420 150 449 C 68 420 14 380 14 344 L 14 70 C 14 56 22 44 40 35 C 69 19 118 10 150 10 Z" stroke="url(#goldInnerRim)" strokeWidth="1.2" />
</svg>
<div className="absolute bottom-1 left-1/2 -translate-x-1/2 z-30 pointer-events-none"><WingedShieldTipIcon className="w-8 h-4" /></div>
</div>
</div>
</div>

<button onClick={handleShareStories} disabled={isSharingImage} className="w-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 font-black py-3 rounded-2xl text-xs flex items-center justify-center gap-2 shadow-lg active:scale-95 transition disabled:opacity-50">
{isSharingImage ? <><div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" /><span>Gerando Imagem HD...</span></> : <><Share2Icon className="w-4 h-4" /><span>Compartilhar Cartinha nos Stories (Insta / WhatsApp)</span></>}
</button>

{showShareModal && (
<div className="bg-slate-900 border border-emerald-500/50 p-3.5 rounded-2xl text-center space-y-2 animate-in fade-in">
<span className="text-xl">📲</span><h4 className="text-xs font-black text-emerald-400 uppercase">Cartinha Pronta para os Stories!</h4>
<p className="text-[11px] text-slate-300 leading-relaxed">A imagem da sua cartinha TOTY foi baixada automaticamente no seu aparelho.</p>
<div className="flex gap-2 pt-1">
<a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1 shadow"><span>Abrir Instagram</span></a>
<button onClick={() => setShowShareModal(false)} className="bg-slate-800 text-slate-300 text-xs px-3 py-2 rounded-xl font-bold border border-slate-700">OK</button>
</div>
</div>
)}

<div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3 relative overflow-hidden">
{!hasFinishedAtLeastOneMatch ? (
<div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center text-center p-4">
<span className="text-3xl mb-2">🔒</span><h4 className="text-amber-400 font-black text-xs uppercase">Avaliações Bloqueadas</h4>
<p className="text-[10px] text-slate-300 mt-1">Aguarde o apito final da partida na Beira de Quadra para liberar a resenha.</p>
</div>
) : null}

<h3 className="text-xs font-black text-slate-200 uppercase flex items-center gap-1.5"><AwardIcon className="w-4 h-4 text-amber-400" /> Resenha Pós-Jogo ({completedMatchesCount} {completedMatchesCount === 1 ? 'partida' : 'partidas'})</h3>
<div className="space-y-1.5">
<span className="text-[11px] text-slate-300 font-bold">1. Escolha o colega de time para avaliar:</span>
<div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
{players.map(p => {
const isEvaluated = evaluatedPlayerIds.includes(p.id);
const isSelected = votingTargetPlayer?.id === p.id;
return (
<button key={p.id} disabled={isEvaluated} onClick={() => setVotingTargetPlayer(p)} className={`p-2.5 rounded-xl border text-left text-xs transition ${isEvaluated ? 'bg-slate-950/60 border-slate-800 text-slate-600 cursor-not-allowed opacity-50' : isSelected ? 'bg-amber-400 text-slate-950 font-black shadow-md' : 'bg-slate-950 hover:bg-slate-800 border-slate-800 text-slate-200'}`}>
<div className="flex justify-between items-center"><span className="truncate">{p.name}</span>{isEvaluated && <CheckCircleIcon className="w-4 h-4 text-emerald-400 shrink-0" />}</div>
</button>
);
})}
</div>
</div>

{votingTargetPlayer && (
<div className="space-y-3 pt-2 border-t border-slate-800 animate-in fade-in">
<span className="text-[11px] text-amber-400 font-bold block">2. Escolha o Selo para <u className="uppercase">{votingTargetPlayer.name}</u>:</span>
<div className="space-y-1.5">
<span className="text-[10px] font-black text-emerald-400 uppercase tracking-wide">👑 Categoria Exaltar:</span>
<div className="grid grid-cols-3 gap-1.5">
<button onClick={() => handleSelectBadgeForVote(BADGES_CONFIG.deitou)} className="bg-slate-950 hover:bg-slate-800 border border-emerald-500/30 text-emerald-400 p-2.5 rounded-xl text-[10px] font-black flex flex-col items-center gap-1 active:scale-95 transition">👑 Deitou</button>
<button onClick={() => handleSelectBadgeForVote(BADGES_CONFIG.terno)} className="bg-slate-950 hover:bg-slate-800 border border-emerald-500/30 text-emerald-400 p-2.5 rounded-xl text-[10px] font-black flex flex-col items-center gap-1 active:scale-95 transition">👔 Terno</button>
<button onClick={() => handleSelectBadgeForVote(BADGES_CONFIG.chover)} className="bg-slate-950 hover:bg-slate-800 border border-emerald-500/30 text-emerald-400 p-2.5 rounded-xl text-[10px] font-black flex flex-col items-center gap-1 active:scale-95 transition">🌧️ Chover</button>
</div>
</div>
<div className="space-y-1.5 pt-1">
<span className="text-[10px] font-black text-rose-400 uppercase tracking-wide">🐟 Categoria Cornetar:</span>
<div className="grid grid-cols-3 gap-1.5">
<button onClick={() => handleSelectBadgeForVote(BADGES_CONFIG.bagre)} className="bg-slate-950 hover:bg-slate-800 border border-rose-500/30 text-rose-400 p-2.5 rounded-xl text-[10px] font-black flex flex-col items-center gap-1 active:scale-95 transition">🐟 Bagre</button>
<button onClick={() => handleSelectBadgeForVote(BADGES_CONFIG.inimigo)} className="bg-slate-950 hover:bg-slate-800 border border-rose-500/30 text-rose-400 p-2.5 rounded-xl text-[10px] font-black flex flex-col items-center gap-1 active:scale-95 transition">🚫 Inimigo</button>
<button onClick={() => handleSelectBadgeForVote(BADGES_CONFIG.tirica)} className="bg-slate-950 hover:bg-slate-800 border border-rose-500/30 text-rose-400 p-2.5 rounded-xl text-[10px] font-black flex flex-col items-center gap-1 active:scale-95 transition">🐌 Tiriça</button>
</div>
</div>
</div>
)}
</div>
</>
)}
</div>
)}

</main>

{/* MODAL: PRÉVIA WHATSAPP */}
{whatsappModal.isOpen && (
<div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-3 animate-in fade-in">
<div className="bg-slate-900 border border-amber-500/50 w-full max-w-md p-4 rounded-3xl space-y-3.5 shadow-2xl">
<div className="flex justify-between items-center border-b border-slate-800 pb-2">
<div className="flex items-center gap-2"><span className="text-emerald-400 text-lg">💬</span><h3 className="font-black text-xs text-amber-400 uppercase tracking-wide truncate">{whatsappModal.title}</h3></div>
<button onClick={() => setWhatsappModal({ ...whatsappModal, isOpen: false })} className="text-xs text-slate-400 hover:text-white font-bold p-1">Fechar</button>
</div>
<p className="text-[11px] text-slate-300">O texto já foi <strong>copiado automaticamente</strong> para a área de transferência:</p>
<textarea id="whatsapp-preview-textarea" readOnly value={whatsappModal.text} onClick={(e) => { e.target.focus(); e.target.select(); }} rows={9} className="w-full bg-slate-950 border border-slate-800 text-[11px] font-mono p-3 rounded-xl text-slate-200 focus:outline-none select-all leading-relaxed cursor-pointer" />
<div className="grid grid-cols-2 gap-2 pt-1">
<button onClick={() => {
const ta = document.getElementById("whatsapp-preview-textarea");
if (ta) { ta.focus(); ta.select(); ta.setSelectionRange(0, 99999); }
copyTextToClipboard(whatsappModal.text, "📋 Mensagem copiada com sucesso!");
}} className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs py-3 px-3 rounded-xl font-bold flex items-center justify-center gap-1.5 border border-slate-700 active:scale-95 transition"><CopyIcon className="w-3.5 h-3.5 text-amber-400" /> Copiar Texto</button>
<a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(whatsappModal.text)}`} target="_blank" rel="noopener noreferrer" className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs py-3 px-3 rounded-xl font-black flex items-center justify-center gap-1.5 active:scale-95 transition shadow-lg shadow-emerald-600/30"><span>Abrir WhatsApp</span><ExternalLinkIcon className="w-3.5 h-3.5" /></a>
</div>
</div>
</div>
)}

{/* MODAL: AUTOR DO GOL */}
{showGoalModal && (
<div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-end justify-center animate-in fade-in" onClick={() => setShowGoalModal(false)}>
<div className="bg-slate-900 border-t-2 border-amber-500 w-full max-w-md p-4 rounded-t-3xl space-y-3 max-h-[70vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
<div className="flex justify-between items-center border-b border-slate-800 pb-2">
<h3 className="font-black text-xs text-amber-400 uppercase">⚽ Quem marcou o gol?</h3>
<button onClick={() => setShowGoalModal(false)} className="text-xs text-slate-400 hover:text-white">Cancelar</button>
</div>
<div className="grid grid-cols-1 gap-2 pt-1">
{(teams[selectedGoalTeam === 'teamA' ? playingTeams.teamA : playingTeams.teamB] || []).map(p => (
<button key={p.id} onClick={() => handleRegisterGoal(p)} className="bg-slate-950 hover:bg-slate-800 p-3 rounded-xl border border-slate-800 flex justify-between items-center active:scale-95 transition text-left">
<span className="font-bold text-xs text-slate-100">{p.name} ({p.pos})</span><span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded-lg font-bold">+1 Gol</span>
</button>
))}
</div>
</div>
</div>
)}

{/* MODAL: FIM DE PARTIDA */}
{showFinishModal && (
<div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
<div className="bg-slate-900 border border-amber-500/40 w-full max-w-sm p-5 rounded-3xl space-y-4 text-center shadow-2xl">
<span className="text-4xl">🏁</span>
<h3 className="font-black text-lg text-amber-400 uppercase">Fim de Jogo!</h3>
<div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-around items-center">
<div><p className="text-[10px] text-slate-400 uppercase font-bold">{teamNames[playingTeams.teamA]}</p><p className="text-3xl font-black text-emerald-400">{score.teamA}</p></div>
<span className="text-slate-600 font-bold text-lg">X</span>
<div><p className="text-[10px] text-slate-400 uppercase font-bold">{teamNames[playingTeams.teamB]}</p><p className="text-3xl font-black text-cyan-400">{score.teamB}</p></div>
</div>
<p className="text-[11px] text-slate-300 bg-slate-950 p-2.5 rounded-xl border border-slate-800">⚖️ <strong>Regra:</strong> Equipes que atingem 2 vitórias consecutivas rodam. A resenha foi liberada no <strong>Portal</strong>!</p>
<div className="flex gap-2 pt-1">
<button onClick={() => setShowFinishModal(false)} className="flex-1 bg-slate-800 text-slate-300 text-xs font-bold py-2.5 rounded-xl">Voltar</button>
<button onClick={handleConfirmFinishMatch} className="flex-1 bg-amber-400 text-slate-950 text-xs font-black py-2.5 rounded-xl shadow-lg">Próximo Jogo</button>
</div>
</div>
</div>
)}

{/* MODAL: CONFIRMAÇÃO DE VOTO DE SELO */}
{showVoteConfirmModal && votingTargetPlayer && pendingBadge && (
<div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
<div className="bg-slate-900 border border-amber-500/40 w-full max-w-sm p-5 rounded-2xl space-y-4 text-center shadow-2xl">
<span className="text-4xl">{pendingBadge.emoji}</span>
<p className="text-xs text-slate-200">Confirmar selo de <strong>{pendingBadge.label}</strong> para <strong>{votingTargetPlayer.name}</strong>?</p>
<div className="flex gap-2">
<button onClick={() => setShowVoteConfirmModal(false)} className="flex-1 bg-slate-800 text-slate-300 text-xs font-bold py-2.5 rounded-xl">Cancelar</button>
<button onClick={handleConfirmVote} className="flex-1 bg-amber-400 text-slate-950 text-xs font-black py-2.5 rounded-xl">Confirmar</button>
</div>
</div>
</div>
)}

{/* MODAL: GOLEIRO CONVIDADO */}
{showGuestGkModal && (
<div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
<div className="bg-slate-900 border border-cyan-500/40 w-full max-w-sm p-4 rounded-2xl space-y-3 shadow-2xl">
<h3 className="font-black text-xs text-cyan-400 uppercase">🧤 Goleiro Convidado</h3>
<input type="text" placeholder="Nome do Goleiro *" value={guestGkName} onChange={(e) => setGuestGkName(e.target.value)} className="w-full bg-slate-950 border border-slate-800 text-xs p-2.5 rounded-xl text-slate-200 focus:outline-none" />
<div className="space-y-1">
<div className="flex justify-between text-xs"><span className="text-slate-400">Nota de Aquecimento:</span><span className="text-cyan-400 font-mono font-bold">{guestGkRating}/10</span></div>
<input type="range" min="1" max="10" value={guestGkRating} onChange={(e) => setGuestGkRating(parseInt(e.target.value))} className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer" />
</div>
<div className="flex gap-2 pt-1">
<button onClick={() => setShowGuestGkModal(false)} className="flex-1 bg-slate-800 text-slate-300 py-2.5 rounded-xl text-xs font-bold">Cancelar</button>
<button onClick={handleAddGuestGoalkeeper} className="flex-1 bg-cyan-500 text-slate-950 font-black py-2.5 rounded-xl text-xs">Adicionar</button>
</div>
</div>
</div>
)}

{/* BARRA DE NAVEGAÇÃO INFERIOR COM TODAS AS ABAS */}
<nav className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 px-1.5 py-2 flex justify-around items-center z-40 max-w-md mx-auto">
{allowedTabs.includes('diretoria') && (
<button onClick={() => setActiveTab('diretoria')} className={`flex flex-col items-center gap-1 px-2 py-1 rounded-xl transition ${activeTab === 'diretoria' ? 'text-amber-400 font-black' : 'text-slate-500'}`}>
<ShieldIcon className="w-4 h-4" /><span className="text-[9px]">Diretoria</span>
</button>
)}
{allowedTabs.includes('cadastro') && (
<button onClick={() => setActiveTab('cadastro')} className={`flex flex-col items-center gap-1 px-2 py-1 rounded-xl transition ${activeTab === 'cadastro' ? 'text-amber-400 font-black' : 'text-slate-500'}`}>
<UserPlusIcon className="w-4 h-4" /><span className="text-[9px]">Cadastro</span>
</button>
)}
{allowedTabs.includes('motor') && (
<button onClick={() => setActiveTab('sorteio')} className={`flex flex-col items-center gap-1 px-2 py-1 rounded-xl transition relative ${activeTab === 'sorteio' ? 'text-amber-400 font-black' : 'text-slate-500'}`}>
<div className="relative"><UsersIcon className="w-4 h-4" />{!isListaFechada && <span className="absolute -top-1 -right-1 text-[8px] leading-none">🔒</span>}</div><span className="text-[9px]">Sorteio</span>
</button>
)}
{allowedTabs.includes('beira') && (
<button onClick={() => setActiveTab('beira')} className={`flex flex-col items-center gap-1 px-2 py-1 rounded-xl transition relative ${activeTab === 'beira' ? 'text-emerald-400 font-black' : 'text-slate-500'}`}>
<div className="relative"><ActivityIcon className="w-4 h-4" />{!isListaFechada && <span className="absolute -top-1 -right-1 text-[8px] leading-none">🔒</span>}{isTimerRunning && <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />}</div><span className="text-[9px]">Quadra</span>
</button>
)}
{allowedTabs.includes('portal') && (
<button onClick={() => setActiveTab('portal')} className={`flex flex-col items-center gap-1 px-2 py-1 rounded-xl transition relative ${activeTab === 'portal' ? 'text-amber-400 font-black' : 'text-slate-500'}`}>
<div className="relative"><TrophyIcon className="w-4 h-4" />{hasFinishedAtLeastOneMatch && <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400" />}</div><span className="text-[9px]">Portal</span>
</button>
)}
</nav>

</div>
);
}