<template>
  <div class="row justify-content-center mt-4">
    <div class="col-md-6">
      <div class="card">
        <div class="card-header d-flex justify-content-between align-items-center">
          <h5 class="mb-0">{{ isEdit ? 'Editar Postulacion' : 'Nueva Postulacion' }}</h5>
          <button class="btn btn-outline-secondary btn-sm" @click="$router.push('/postulaciones')">Volver</button>
        </div>

        <div class="card-body">
          <form @submit.prevent="guardar">
            <div v-if="error" class="alert alert-danger">{{ error }}</div>

            <div class="mb-3">
              <label for="candidato" class="form-label">Nombre del Candidato</label>
              <input type="text" id="candidato" class="form-control" v-model="form.candidato" required placeholder="Ej. Juan Perez">
            </div>

            <div class="mb-3">
              <label for="email" class="form-label">Email de Contacto</label>
              <input type="email" id="email" class="form-control" v-model="form.email" required placeholder="Ej. juan@correo.com">
            </div>

            <div class="mb-3">
              <label for="experiencia" class="form-label">Experiencia</label>
              <input type="text" id="experiencia" class="form-control" v-model="form.experiencia" required placeholder="Ej. 3 años en desarrollo web">
            </div>

            <div class="mb-3">
              <label for="trabajo" class="form-label">Oferta a la que Postula</label>
              <select id="trabajo" class="form-select" v-model="form.trabajoId" required>
                <option value="" disabled>Selecciona una oferta</option>
                <option v-for="job in trabajos" :key="job.id" :value="job.id">
                  {{ job.titulo }}
                </option>
              </select>
            </div>

            <button type="submit" class="btn btn-primary w-100" :disabled="loading">
              {{ loading ? 'Guardando...' : 'Guardar' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getPostulacion, createPostulacion, updatePostulacion } from '@/services/postulacionService';
import { getTrabajos } from '@/services/trabajoService';

const route = useRoute();
const router = useRouter();

const form = ref({
  candidato: '',
  email: '',
  experiencia: '',
  trabajoId: ''
});

const trabajos = ref([]);
const loading = ref(false);
const error = ref('');

const isEdit = computed(() => !!route.params.id);

onMounted(async () => {
  try {
    trabajos.value = await getTrabajos();
    
    if (isEdit.value) {
      loading.value = true;
      const data = await getPostulacion(route.params.id);
      form.value = { 
        candidato: data.candidato,
        email: data.email,
        experiencia: data.experiencia,
        trabajoId: data.trabajoId
      };
    }
  } catch (err) {
    error.value = 'Error al cargar los datos';
  } finally {
    loading.value = false;
  }
});

const guardar = async () => {
  try {
    loading.value = true;
    error.value = '';
    
    if (isEdit.value) {
      await updatePostulacion(route.params.id, form.value);
    } else {
      await createPostulacion(form.value);
    }
    
    router.push('/postulaciones');
  } catch (err) {
    error.value = 'Error al guardar la postulacion.';
  } finally {
    loading.value = false;
  }
};
</script>
