<template>
  <div class="container mt-4">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h2>Postulaciones</h2>
      <button class="btn btn-primary" @click="$router.push('/postulaciones/nuevo')">Nueva Postulacion</button>
    </div>

    <div v-if="loading" class="text-center text-muted">Cargando postulaciones...</div>
    <div v-else-if="error" class="alert alert-danger">{{ error }}</div>
    <div v-else>
      <div v-if="postulaciones.length === 0" class="text-center text-muted">No hay postulaciones registradas.</div>
      <table v-else class="table table-hover table-bordered bg-white">
        <thead class="table-light">
          <tr>
            <th>ID</th>
            <th>Candidato</th>
            <th>Email</th>
            <th>Oferta de Empleo</th>
            <th>Experiencia</th>
            <th width="200">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="post in postulaciones" :key="post.id">
            <td>{{ post.id }}</td>
            <td>{{ post.candidato }}</td>
            <td>{{ post.email }}</td>
            <td>{{ post.trabajo ? post.trabajo.titulo : 'Desconocido' }}</td>
            <td>{{ post.experiencia }}</td>
            <td>
              <button class="btn btn-warning btn-sm me-2" @click="$router.push(`/postulaciones/${post.id}/editar`)">Editar</button>
              <button class="btn btn-danger btn-sm" @click="eliminar(post.id)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
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
