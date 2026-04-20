<script setup>
    import { isLogin, logout as authLogout } from '@/services/authService';
    import appMemory from '@/services/appMemory';
    const logout = () => {
        authLogout();
        appMemory.clear();
        window.location.href = '/';
    };
</script>

<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm py-3">
        <div class="container">
            <router-link to="/" class="navbar-brand fw-bold mb-0 h1 fs-3">
                EmpleosYa!
            </router-link>
            <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0 fs-5">
                    <li class="nav-item">
                        <router-link to="/" class="nav-link px-3" active-class="active fw-semibold">Inicio</router-link>
                    </li>
                    <li class="nav-item" v-if="isLogin()">
                        <router-link to="/categorias" class="nav-link px-3" active-class="active fw-semibold">Categorias</router-link>
                    </li>
                    <li class="nav-item" v-if="isLogin()">
                        <router-link to="/trabajos" class="nav-link px-3" active-class="active fw-semibold">Ofertas</router-link>
                    </li>
                    <li class="nav-item" v-if="isLogin()">
                        <router-link to="/postulaciones" class="nav-link px-3" active-class="active fw-semibold">Postulaciones</router-link>
                    </li>
                </ul>
                <div>
                    <div class="nav-item d-flex align-items-center gap-3" v-if="isLogin()">
                        <span class="text-white bg-opacity-25 bg-white px-3 py-1 rounded-pill fw-medium">
                            Hola, {{ appMemory.get('userName') || 'Usuario' }}
                        </span>
                        <button class="btn btn-light text-primary fw-bold btn-sm shadow-sm rounded-pill px-3" @click="logout()">
                            Salir
                        </button>
                    </div>
                    <div class="nav-item d-flex gap-2" v-else>
                        <router-link to="/login" class="btn btn-outline-light fw-medium px-4 rounded-pill">
                            Ingresar
                        </router-link>
                        <router-link to="/register" class="btn btn-light text-primary fw-bold px-4 rounded-pill shadow-sm">
                            Registrarse
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>