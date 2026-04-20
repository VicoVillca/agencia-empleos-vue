<template>
  <div class="row justify-content-center mt-4">
    <div class="col-md-8">
      <div class="mb-3">
        <button class="btn btn-outline-secondary" @click="$router.push('/trabajos')">Volver a empleos</button>
      </div>

      <div v-if="loading" class="text-center text-muted">Cargando detalles del empleo...</div>
      <div v-else-if="error" class="alert alert-danger">{{ error }}</div>
      <div v-else-if="trabajo" class="card shadow-sm border-0">
        <div class="card-header bg-light p-4 d-flex justify-content-between align-items-center">
          <h2 class="mb-0">{{ trabajo.titulo }}</h2>
          <span class="badge bg-primary fs-6" v-if="trabajo.categoria">{{ trabajo.categoria.nombre }}</span>
        </div>
        
        <div class="card-body bg-light border-bottom p-4">
          <div class="row">
            <div class="col-md-4">
              <p class="mb-1 text-muted">Empresa</p>
              <p class="fw-bold">{{ trabajo.empresa }}</p>
            </div>
            <div class="col-md-4">
              <p class="mb-1 text-muted">Ubicacion</p>
              <p class="fw-bold">{{ trabajo.ubicacion }}</p>
            </div>
            <div class="col-md-4">
              <p class="mb-1 text-muted">Salario</p>
              <p class="fw-bold text-success">{{ trabajo.salario || 'A convenir' }}</p>
            </div>
          </div>
        </div>

        <div class="card-body p-4">
          <h4 class="mb-3">Descripcion del Puesto</h4>
          <p class="card-text" style="white-space: pre-wrap;">{{ trabajo.descripcion }}</p>
        </div>
        
        <div class="card-footer bg-white p-4 text-end">
          <button class="btn btn-primary btn-lg" @click="aplicar">Aplicar a esta oferta</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getTrabajo } from '@/services/trabajoService';

const route = useRoute();
const trabajo = ref(null);
const loading = ref(false);
const error = ref('');

onMounted(async () => {
  loading.value = true;
  try {
    trabajo.value = await getTrabajo(route.params.id);
  } catch (err) {
    error.value = 'No se pudo cargar la informacion del empleo.';
  } finally {
    loading.value = false;
  }
});

const aplicar = () => {
  alert('Funcionalidad de aplicar en desarrollo. ¡Pronto disponible!');
};
</script>
