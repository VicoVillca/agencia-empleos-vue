<template>
  <div class="row justify-content-center py-5">
    <div class="col-md-7 col-lg-6">
      <div class="card border-0 shadow-sm rounded-4">
        <div class="card-header bg-white border-bottom-0 pt-4 pb-0 px-4 d-flex justify-content-between align-items-center">
          <h4 class="mb-0 fw-bold text-primary">{{ isEdit ? 'Editar Postulacion' : 'Nueva Postulacion' }}</h4>
          <button class="btn btn-light btn-sm rounded-pill fw-medium text-secondary" @click="$router.push('/postulaciones')">Volver</button>
        </div>

        <div class="card-body p-4">
          <form @submit.prevent="guardar">
            <div v-if="error" class="alert alert-danger rounded-3">{{ error }}</div>

            <div class="mb-4">
              <label for="candidato" class="form-label fw-semibold text-secondary">Nombre del Candidato</label>
              <input type="text" id="candidato" class="form-control form-control-lg bg-light border-0" v-model="form.candidato" required placeholder="Ej. Juan Perez">
            </div>

            <div class="mb-4">
              <label for="email" class="form-label fw-semibold text-secondary">Email de Contacto</label>
              <input type="email" id="email" class="form-control form-control-lg bg-light border-0" v-model="form.email" required placeholder="Ej. juan@correo.com">
            </div>

            <div class="mb-4">
              <label for="experiencia" class="form-label fw-semibold text-secondary">Años de Experiencia</label>
              <input type="text" id="experiencia" class="form-control form-control-lg bg-light border-0" v-model="form.experiencia" required placeholder="Ej. 3 años en desarrollo web">
            </div>

            <div class="mb-4">
              <label for="trabajo" class="form-label fw-semibold text-secondary">Oferta a la que Postula</label>
              <select id="trabajo" class="form-select form-select-lg bg-light border-0 text-secondary" v-model="form.trabajoId" required>
                <option value="" disabled>Selecciona una oferta activa...</option>
                <option v-for="job in trabajos" :key="job.id" :value="job.id">
                  {{ job.titulo }}
                </option>
              </select>
            </div>

            <button type="submit" class="btn btn-primary btn-lg w-100 rounded-pill shadow-sm mt-2" :disabled="loading">
              {{ loading ? 'Enviando...' : 'Enviar Candidatura' }}
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
