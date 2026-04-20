<script setup lang="ts">
import { isLogin } from '@/services/authService'
</script>

<template>
  <div class="row align-items-center py-5">
    <div class="col-lg-8 mx-auto text-center px-4">
      <h1 class="display-4 fw-bold text-primary mb-3">Agencia de Empleos</h1>
      <p class="lead text-secondary mb-4">Conectando talento brillante con las mejores oportunidades laborales.</p>
      
      <div v-if="!isLogin()" class="d-flex justify-content-center gap-3 mt-4">
        <router-link to="/login" class="btn btn-primary btn-lg shadow-sm px-4 rounded-pill">Iniciar Sesion</router-link>
        <router-link to="/register" class="btn btn-outline-secondary btn-lg shadow-sm px-4 rounded-pill">Registrarse</router-link>
      </div>
      <div v-else class="mt-4">
        <router-link to="/trabajos" class="btn btn-primary btn-lg shadow-sm px-5 rounded-pill">Explorar Ofertas</router-link>
      </div>
    </div>
  </div>

  <div class="row mt-4 g-4 pb-5">
    <div class="col-md-4">
      <div class="card h-100 border-0 shadow-sm rounded-4 text-center p-3">
        <div class="card-body">
          <div class="display-5 text-primary mb-3">💼</div>
          <h3 class="card-title h5 fw-bold">Encuentra tu vocacion</h3>
          <p class="card-text text-muted">Miles de ofertas de empleo actualizadas en distintas areas listas para tu perfil.</p>
        </div>
      </div>
    </div>
    <div class="col-md-4">
      <div class="card h-100 border-0 shadow-sm rounded-4 text-center p-3">
        <div class="card-body">
          <div class="display-5 text-primary mb-3">🏢</div>
          <h3 class="card-title h5 fw-bold">Las mejores empresas</h3>
          <p class="card-text text-muted">Conecta de manera directa con las corporaciones e instituciones mas eficientes.</p>
        </div>
      </div>
    </div>
    <div class="col-md-4">
      <div class="card h-100 border-0 shadow-sm rounded-4 text-center p-3">
        <div class="card-body">
          <div class="display-5 text-primary mb-3">🚀</div>
          <h3 class="card-title h5 fw-bold">Postulacion Rapida</h3>
          <p class="card-text text-muted">Crea tu cuenta gratis hoy mismo y envia tu candidatura con un solo boton.</p>
        </div>
      </div>
    </div>
  </div>
</template>
