// auth.js
const SUPABASE_URL = 'https://vudjdiokeniwsgyyxasl.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ1ZGpkaW9rZW5pd3NneXl4YXNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzNjg2NTYsImV4cCI6MjA3NTk0NDY1Nn0.2wh4B4VhjyTRy7iuaU9ihse7yPmpj_jyRwdg7zKNawM';

let supabase;

// Inicializar Supabase
function initAuth() {
    try {
        if (window.supabase && typeof window.supabase.createClient === 'function') {
            supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
            console.log('✅ Supabase inicializado correctamente');
            return true;
        }
        console.error('❌ Supabase no está disponible');
        return false;
    } catch (error) {
        console.error('❌ Error creando cliente de Supabase:', error);
        return false;
    }
}

// Función para recuperación de contraseña
async function handlePasswordReset(e) {
    e.preventDefault();
    console.log('📧 Solicitando recuperación de contraseña...');
    
    if (!supabase) {
        const resetError = document.getElementById('reset-error');
        const errorMsg = document.documentElement.lang === 'es' 
            ? 'Error: Supabase no está configurado.' 
            : 'Error: Supabase is not configured.';
        resetError.textContent = errorMsg;
        resetError.style.display = 'block';
        return false;
    }
    
    const resetEmail = document.getElementById('reset-email').value;
    const resetError = document.getElementById('reset-error');
    resetError.style.display = 'none';
    resetError.textContent = '';

    try {
        const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
            redirectTo: `${window.location.origin}/reset-password.html`,
        });

        if (error) {
            const errorMsg = document.documentElement.lang === 'es'
                ? `Error al enviar correo: ${error.message}`
                : `Error sending email: ${error.message}`;
            resetError.textContent = errorMsg;
            resetError.style.display = 'block';
            return false;
        }

        // Éxito
        const successMsg = document.documentElement.lang === 'es'
            ? '✅ Correo enviado. Revisa tu bandeja de entrada para restablecer tu contraseña.'
            : '✅ Email sent. Check your inbox to reset your password.';
        
        resetError.textContent = successMsg;
        resetError.style.color = '#28a745';
        resetError.style.display = 'block';
        
        // Limpiar formulario después de 5 segundos
        setTimeout(() => {
            document.getElementById('reset-email').value = '';
            resetError.style.display = 'none';
            window.AuthManager.showTab('login');
        }, 5000);
        
        return true;
    } catch (error) {
        const errorMsg = document.documentElement.lang === 'es'
            ? `Error inesperado: ${error.message}`
            : `Unexpected error: ${error.message}`;
        resetError.textContent = errorMsg;
        resetError.style.display = 'block';
        return false;
    }
}

// Función para actualizar contraseña (cuando el usuario hace clic en el enlace del correo)
async function handleUpdatePassword(newPassword) {
    console.log('🔄 Intentando actualizar contraseña...');
    
    if (!supabase) {
        console.error('❌ Supabase no está inicializado');
        return { success: false, error: 'Supabase no está configurado' };
    }
    
    try {
        // Verificar la sesión actual
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
            console.error('Error obteniendo sesión:', sessionError);
            return { success: false, error: sessionError.message };
        }
        
        console.log('Sesión actual:', session);
        
        if (!session) {
            console.error('❌ No hay sesión activa');
            return { success: false, error: 'No hay sesión activa. Debes hacer clic en el enlace del correo primero.' };
        }
        
        // Actualizar la contraseña
        console.log('📝 Actualizando contraseña...');
        const { data, error } = await supabase.auth.updateUser({
            password: newPassword
        });

        if (error) {
            console.error('❌ Error actualizando contraseña:', error);
            return { success: false, error: error.message };
        }
        
        console.log('✅ Contraseña actualizada exitosamente:', data);
        
        // Cerrar sesión después de actualizar la contraseña
        console.log('🚪 Cerrando sesión...');
        const { error: signOutError } = await supabase.auth.signOut();
        
        if (signOutError) {
            console.error('❌ Error cerrando sesión:', signOutError);
            // Aún así consideramos éxito pero con advertencia
            console.warn('⚠️ No se pudo cerrar sesión, pero la contraseña se actualizó');
        } else {
            console.log('✅ Sesión cerrada correctamente');
        }
        
        return { success: true, data: data };
        
    } catch (error) {
        console.error('❌ Error inesperado:', error);
        return { success: false, error: error.message };
    }
}

// Función para cambiar entre pestañas de Login y Registro
function showTab(tabName) {
    console.log('🔄 Cambiando a pestaña:', tabName);
    
    // Ocultar todos los formularios
    document.querySelectorAll('.auth-form').forEach(form => {
        form.style.display = 'none';
        form.classList.remove('active');
    });
    
    // Mostrar solo el formulario seleccionado
    const targetForm = document.querySelector(`.auth-form[data-view="${tabName}"]`);
    if (targetForm) {
        console.log('✅ Mostrando formulario:', tabName);
        targetForm.style.display = 'block';
        targetForm.classList.add('active');
    }
    
    // Actualizar botones de pestaña
    document.querySelectorAll('.tab-btn').forEach(btn => {
        const isActive = btn.getAttribute('data-tab') === tabName;
        btn.classList.toggle('active', isActive);
    });
    
    // Limpiar errores al cambiar de vista
    const loginError = document.getElementById('login-error');
    const registerError = document.getElementById('register-error');
    const resetError = document.getElementById('reset-error');
    
    if (loginError) {
        loginError.style.display = 'none';
        loginError.textContent = '';
    }
    if (registerError) {
        registerError.style.display = 'none';
        registerError.textContent = '';
    }
    if (resetError) {
        resetError.style.display = 'none';
        resetError.textContent = '';
    }
}

// Manejar registro de usuario
async function handleSignUp(e) {
    e.preventDefault();
    console.log('📝 Intentando registro...');
    
    if (!supabase) {
        const registerError = document.getElementById('register-error');
        // Mensaje en el idioma correspondiente
        const errorMsg = document.documentElement.lang === 'es' 
            ? 'Error: Supabase no está configurado.' 
            : 'Error: Supabase is not configured.';
        registerError.textContent = errorMsg;
        registerError.style.display = 'block';
        return;
    }
    
    const registerName = document.getElementById('register-name').value;
    const registerEmail = document.getElementById('register-email').value;
    const registerPassword = document.getElementById('register-password').value;
    const registerError = document.getElementById('register-error');
    registerError.style.display = 'none';
    registerError.textContent = '';

    try {
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email: registerEmail,
            password: registerPassword,
            options: {
                data: { name: registerName }
            }
        });

        if (authError) {
            // Mensaje de error según idioma
            const errorMsg = document.documentElement.lang === 'es'
                ? `Error de registro: ${authError.message}`
                : `Registration error: ${authError.message}`;
            registerError.textContent = errorMsg;
            registerError.style.display = 'block';
            return;
        }

        if (authData.user) {
            console.log('✅ Usuario creado en Auth:', authData.user.id);
            
            // Intentar crear perfil (opcional)
            try {
                const { error: profileError } = await supabase
                    .from('profiles')
                    .insert([{ 
                        id: authData.user.id,
                        name: registerName 
                    }]);

                if (profileError) {
                    console.warn('⚠️ No se pudo crear perfil:', profileError);
                }
            } catch (profileError) {
                console.warn('⚠️ Error al crear perfil:', profileError);
            }

            // MENSAJE DE ÉXITO EN INGLÉS/ESPAÑOL
            const successMsg = document.documentElement.lang === 'es'
                ? "¡Registro exitoso! Revisa tu correo para confirmar tu cuenta."
                : "Registration successful! Check your email to confirm your account.";
            
            registerError.textContent = successMsg;
            registerError.style.color = '#28a745';
            registerError.style.display = 'block';
            
            setTimeout(() => {
                window.AuthManager.showTab('login');
                document.getElementById('register-form').reset();
                registerError.style.display = 'none'; 
            }, 4000);
        }
    } catch (error) {
        console.error('❌ Error inesperado:', error);
        // Mensaje de error inesperado según idioma
        const errorMsg = document.documentElement.lang === 'es'
            ? `Error inesperado: ${error.message}`
            : `Unexpected error: ${error.message}`;
        registerError.textContent = errorMsg;
        registerError.style.display = 'block';
    }
}

// Manejar inicio de sesión
async function handleSignIn(e) {
    e.preventDefault();
    console.log('🔐 Intentando login...');
    
    if (!supabase) {
        const loginError = document.getElementById('login-error');
        const errorMsg = document.documentElement.lang === 'es'
            ? 'Error: Supabase no está configurado.'
            : 'Error: Supabase is not configured.';
        loginError.textContent = errorMsg;
        loginError.style.display = 'block';
        return false;
    }
    
    const loginEmail = document.getElementById('login-email').value;
    const loginPassword = document.getElementById('login-password').value;
    const loginError = document.getElementById('login-error');
    loginError.style.display = 'none';
    loginError.textContent = '';

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: loginEmail,
            password: loginPassword,
        });

        if (error) {
            // Mensaje de error de login según idioma
            const errorMsg = document.documentElement.lang === 'es'
                ? `Error de acceso: ${error.message}. Verifica tus credenciales.`
                : `Login error: ${error.message}. Check your credentials.`;
            loginError.textContent = errorMsg;
            loginError.style.display = 'block';
            return false;
        } else if (data.user) {
            console.log('✅ Login exitoso');
            return true;
        }
    } catch (error) {
        // Mensaje de error inesperado según idioma
        const errorMsg = document.documentElement.lang === 'es'
            ? `Error inesperado: ${error.message}`
            : `Unexpected error: ${error.message}`;
        loginError.textContent = errorMsg;
        loginError.style.display = 'block';
    }
    return false;
}

// Comprobar sesión activa
async function checkAuthSession() {
    if (!supabase) return null;
    
    const { data: { session } } = await supabase.auth.getSession();
    return session;
}

// Cerrar sesión
async function handleLogout() {
    if (!supabase) {
        const errorMsg = document.documentElement.lang === 'es'
            ? 'Supabase no está configurado'
            : 'Supabase is not configured';
        alert(errorMsg);
        return;
    }
    
    const { error } = await supabase.auth.signOut();
    if (!error) {
        console.log('✅ Sesión cerrada correctamente');
        // Limpiar cualquier estado local
        localStorage.removeItem('favoritos');
        // Recargar para asegurar estado limpio
        window.location.href = 'index.html';
    } else {
        const errorMsg = document.documentElement.lang === 'es'
            ? 'Error al cerrar sesión: ' + error.message
            : 'Logout error: ' + error.message;
        alert(errorMsg);
    }
}

// Inicializar listeners de autenticación
function initAuthListeners() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const resetForm = document.getElementById('reset-form');
    const tabButtons = document.querySelectorAll('.auth-tabs .tab-btn');
    const backToLoginLinks = document.querySelectorAll('.back-to-login-link');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleSignIn);
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', handleSignUp);
    }
    
    if (resetForm) {
        resetForm.addEventListener('submit', handlePasswordReset);
    }
    
    // Listeners para enlaces "Volver al login"
    backToLoginLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            window.AuthManager.showTab('login');
        });
    });
    
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            showTab(btn.getAttribute('data-tab'));
        });
    });
}

// Hacer funciones disponibles globalmente
window.AuthManager = {
    initAuth,
    initAuthListeners,
    handleSignIn, 
    handleSignUp,
    handlePasswordReset,
    handleUpdatePassword,
    checkAuthSession,
    handleLogout,
    showTab
};

// También mantener handleLogout global para el onclick
window.handleLogout = handleLogout;