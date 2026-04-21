// main.js - Archivo principal que coordina los demás
async function initializeApp() {
    console.log('🚀 Inicializando aplicación...');
    
    // 1. Inicializar autenticación
    const authInitialized = window.AuthManager.initAuth();
    
    if (!authInitialized) {
        console.log('⚠️  Supabase no configurado - mostrando pantalla de login');
        document.getElementById('login-screen').style.display = 'flex';
        document.getElementById('app-content').style.display = 'none';
        window.AuthManager.showTab('login');
        return;
    }
    
    // 2. Configurar listeners de autenticación
    window.AuthManager.initAuthListeners();
    
    // 3. Modificar el handler de login para integrar con app.js
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const loginSuccess = await window.AuthManager.handleSignIn(e);
            if (loginSuccess) {
                // Obtener información del usuario después del login
                const session = await window.AuthManager.checkAuthSession();
                if (session && session.user) {
                    window.AppManager.actualizarInfoUsuario(session.user);
                }
                window.AppManager.showAppContent();
            }
        });
    }
    
    // 4. Verificar autenticación
    const session = await window.AuthManager.checkAuthSession();
    
    if (session) {
        console.log('✅ Sesión activa encontrada');
        // Cargar información del usuario
        window.AppManager.actualizarInfoUsuario(session.user);
        window.AppManager.showAppContent();
    } else {
        console.log('🔐 No hay sesión activa - mostrando login');
        document.getElementById('login-screen').style.display = 'flex';
        document.getElementById('app-content').style.display = 'none';
        window.AuthManager.showTab('login');
    }
}

// Iniciar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initializeApp);

// Manejar redimensionamiento
window.addEventListener('resize', () => {
    const navMenu = document.getElementById('nav-menu');
    const menuBtn = document.getElementById('menu-btn');
    if (window.innerWidth > 768 && navMenu) {
        navMenu.classList.remove('open');
        if (menuBtn) menuBtn.textContent = '☰';
    }
});