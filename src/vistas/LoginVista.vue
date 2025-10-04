<script setup lang="ts">
import { ref } from 'vue';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';

const usuario = ref('');
const contrasena = ref('');

function iniciarSesion() {
    console.log('Iniciando sesión...', { usuario: usuario.value });
}
</script>

<template>
    <div class="contenedor">
        <div class="fila justificar-centro">
            <div class="columna-12 columna-md-6 columna-lg-4">
                <div class="tarjeta-login">
                    <h1>Iniciar Sesión</h1>
                    <p>Ingrese sus credenciales para acceder al sistema SRI.</p>

                    <form @submit.prevent="iniciarSesion" class="formulario-login">
                        <div class="campo">
                            <label for="usuario">Usuario:</label>
                            <InputText id="usuario" v-model="usuario" placeholder="Ingrese su usuario"
                                class="ancho-completo" />
                        </div>

                        <div class="campo">
                            <label for="contrasena">Contraseña:</label>
                            <Password id="contrasena" v-model="contrasena" placeholder="Ingrese su contraseña"
                                class="ancho-completo" :feedback="false" toggleMask />
                        </div>

                        <Button type="submit" label="Iniciar Sesión" class="p-button-primary ancho-completo" />
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.tarjeta-login {
    background: var(--color-blanco);
    padding: var(--espacio-5);
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-top: var(--espacio-4);
}

.tarjeta-login h1 {
    color: var(--color-azul-principal);
    text-align: center;
    margin-bottom: var(--espacio-2);
}

.tarjeta-login p {
    text-align: center;
    margin-bottom: var(--espacio-4);
    color: var(--color-gris-oscuro);
}

.formulario-login {
    display: flex;
    flex-direction: column;
    gap: var(--espacio-3);
}

.campo {
    display: flex;
    flex-direction: column;
    gap: var(--espacio-1);
}

.campo label {
    font-weight: 500;
    color: var(--color-azul-principal);
}

.ancho-completo {
    width: 100%;
}
</style>
