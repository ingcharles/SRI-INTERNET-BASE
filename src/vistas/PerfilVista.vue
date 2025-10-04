<script setup lang="ts">
// Lógica del componente Perfil
</script>

<template>
    <div class="contenedor">
        <div class="fila">
            <div class="columna-12">
                <h1>Perfil de Usuario</h1>
                <p>Esta es la vista del perfil del usuario.</p>

                <div class="tarjeta-perfil">
                    <h2>Información Personal</h2>
                    <p>Aquí se mostraría la información del perfil del usuario.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.tarjeta-perfil {
    background: var(--color-blanco);
    padding: var(--espacio-4);
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-top: var(--espacio-3);
}

.tarjeta-perfil h2 {
    color: var(--color-azul-principal);
    margin-bottom: var(--espacio-2);
}
</style>
