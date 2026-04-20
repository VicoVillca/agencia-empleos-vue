<template>
  <div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="fw-bold text-primary mb-0">Postulaciones Activas</h2>
      <button class="btn btn-primary rounded-pill shadow-sm px-4 fw-medium" @click="$router.push('/postulaciones/nuevo')">+ Añadir Postulacion</button>
    </div>

    <div v-if="loading" class="text-center text-muted my-5">
      <div class="spinner-border text-primary" role="status"></div>
      <p class="mt-2">Cargando postulaciones...</p>
    </div>
    <div v-else-if="error" class="alert alert-danger shadow-sm">{{ error }}</div>
    <div v-else>
      <div v-if="postulaciones.length === 0" class="alert alert-info shadow-sm text-center border-0">No hay postulaciones registradas en tu perfil.</div>
      <div v-else class="card border-0 shadow-sm rounded-4 overflow-hidden">
        <table class="table table-hover mb-0 bg-white">
          <thead class="table-light">
            <tr>
              <th class="py-3 px-4">#</th>
              <th class="py-3 px-4">Candidato</th>
              <th class="py-3 px-4">Email</th>
              <th class="py-3 px-4">Oferta Vinculada</th>
              <th class="py-3 px-4">Experiencia</th>
              <th class="py-3 px-4 text-center" width="200">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="post in postulaciones" :key="post.id">
              <td class="py-3 px-4 align-middle text-muted">{{ post.id }}</td>
              <td class="py-3 px-4 align-middle fw-bold text-dark">{{ post.candidato }}</td>
              <td class="py-3 px-4 align-middle">{{ post.email }}</td>
              <td class="py-3 px-4 align-middle text-primary"><i class="bi bi-briefcase me-1"></i> {{ post.trabajo ? post.trabajo.titulo : 'Oferta Eliminada' }}</td>
              <td class="py-3 px-4 align-middle">{{ post.experiencia }}</td>
              <td class="py-3 px-4 align-middle text-center">
                <button class="btn btn-warning btn-sm me-2 rounded-3 fw-medium" @click="$router.push(`/postulaciones/${post.id}/editar`)">Editar</button>
                <button class="btn btn-outline-danger btn-sm rounded-3 fw-medium" @click="eliminar(post.id)">Quitar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getPostulaciones, deletePostulacion } from '@/services/postulacionService';

const postulaciones = ref([]);
const loading = ref(false);
const error = ref('');

const loadPostulaciones = async () => {
  loading.value = true;
  error.value = '';
  try {
    postulaciones.value = await getPostulaciones();
  } catch (err) {
    error.value = 'Error al cargar las postulaciones.';
  } finally {
    loading.value = false;
  }
};

const eliminar = async (id) => {
  if (confirm('¿Estas seguro de eliminar esta postulacion?')) {
    try {
      await deletePostulacion(id);
      await loadPostulaciones();
    } catch (err) {
      alert('Error al eliminar');
    }
  }
};

onMounted(() => {
  loadPostulaciones();
});
</script>
