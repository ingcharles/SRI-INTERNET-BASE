<!--
* Nombre: ConsultarTipoParametro.vue
* Descripción: pagina de ejemplo de consumo de servicio rest con CRUD de una tabla denominada tipo parametro.
* Autor: Coordinación de Gestión de Datos y Arquitectura Tecnológica 
* Copyright 2024 Servicio de Rentas Internas.
-->

<template>
    <div class="contenido-form">
        <div class="formulario">
            <h1 class="titulo">{{ $t('tipoParametro.crear.titulo') }}</h1>
            <h2 class="subtitulo">{{ $t('tipoParametro.consultar.subtitulo') }}</h2>
            <div class="instrucciones">{{ $t('tipoParametro.consultar.instrucciones') }}</div>
            <Message
                v-if="mensajePantalla"
                id="msgMensajePantalla"
                :severity="severidadMensaje"
                :closable="false"
                >{{ mensajePantalla }}
            </Message>                 
            <br />
            <div class="grid-container-4">
                <div class="grid-item">
                    <label id="lblEstado" :for="estados[0].id">*Estado:</label>
                </div>
                <div v-for="estado of estados" :key="estado.id" class="grid-item">
                    <RadioButton
                        :id="'rbnEstado-' + estado.id" 
                        v-model="estadoSeleccionado"
                        :input-id="estado.id"
                        name="estado"
                        :value="estado.id"
                        required
                    />
                    <label id="lblNombreEstado" class="margen-izquierdo-5" :for="estado.id">{{ estado.nombre }}</label>
                </div>
                <div class="grid-item">
                    <InlineMessage
                        v-if="campoObligatorio && estadoSeleccionado == ''"
                        id="imsMensajeRequerido"
                    >
                        {{ $t('mensaje.requerido') }}
                    </InlineMessage>
                </div>
            </div>
            <div class="centrar-botones">
                <Button
                    id="btnBuscar"
                    type="button"
                    label="Buscar"
                    @click="obtenerTiposParametrosPorEstado()"
                />
                <Button
                    id="btnCancelar"
                    type="button"
                    label="Cancelar"
                    class="p-button-secondary"
                    @click="resetearDatos()"
                />
            </div>
            <br/>            
            <div v-if="tiposParametros" class="resumenDataTable">{{ $t('tipoParametro.consultar.resumen') }}{{ tiposParametros.length }} {{ $t('tipoParametro.consultar.resumen2') }}
            </div>           
            <br/>
            <DataTable
                id="dttTiposParametros"
                :value="tiposParametros"
                emptyMessage="No hay registros disponibles"
                paginator                  
                :rows="10" 
                :rows-per-page-options="[10, 20, 30, 40, 50]"      
                table-style="width: 800px" 
                :scrollable=true
                > 
                <template #empty> {{ $t('tipoParametro.consultar.sinresultados') }} </template>
                <Column field="codigo" header="Código" style="width: 10%", ></Column>
                <Column field="nombre" header="Nombre" style="width: 20%"></Column>
                <Column field="descripcion" header="Descripción"  style="width: 30%"></Column>
                <Column field="fechaVigencia" header="Fecha Vigencia" style="width: 15%"></Column>
                <Column field="estado" header="Estado"  style="width: 10%"></Column>
                <Column header="Acciones"  style="width: 15%">
                    <template #body="slotProps"
                        ><div>
                            <Button
                                id="btnActualizarTipoParametro"
                                icon="sri-icon-editar"
                                class="p-button-rounded p-button-text"
                                :disabled="estadoSeleccionado == 'INA'"
                                @click="habilitarDialogoActualizarTipoParametro(slotProps.data)"
                            />
                            <Button
                                id="btnEliminarTipoParametro"
                                icon="sri-icon-eliminar"
                                class="p-button-rounded p-button-secondary p-button-text color-rojo"
                                :disabled="estadoSeleccionado == 'INA'"
                                @click="confirmarEliminarTipoParametro(slotProps.data)"
                            />
                        </div>
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
    <Dialog
        id="dlgEliminarTipoParametro"
        v-model:visible="eliminarTipoParametroDialog"
        header="Confirm"
        :modal="true"
        :closable="false"
    >
        <template #header>
            <div class="formulario">
                <h3>Confirmar Eliminación</h3>
            </div>
        </template>
        <div class="confirmation-content">
            <span v-if="tipoParametroSeleccionado"
                >¿Está seguro que desea eliminar el Tipo Parámetro seleccionado?</span
            >
        </div>
        <template #footer>
            <div class="centrar-botones">
                <Button
                    id="btnAceptar"
                    label="Aceptar"
                    class="p-button-success"
                    @click="eliminarTipoParametro"
                />
                <Button
                    id="btnCancelarEliminar"
                    label="Cancelar"
                    class="p-button-secondary"
                    @click="eliminarTipoParametroDialog = false"
                />
            </div>
        </template>
    </Dialog>
    <Dialog
        id="dlgActualizarTipoParametro"
        v-model:visible="actualizarTipoParametroDialog"
        :x="500"
        header="Confirm"
        :modal="true"
        :closable="false"
    >
        <template #header>
            <div class="formulario">
                <h3>Actualizar Tipo Parámetro</h3>
                <p class="instrucciones">Ingrese los valores requeridos</p>
            </div>
        </template>
        <Message v-if="mensajes.length>0" :severity="severidadMensaje" :closable="false" >
            <span v-for="(mensaje, indice) in mensajes" :key="indice">
                {{ mensaje}}<br v-if="indice < mensajes.length - 1">
            </span>
        </Message>        
        <div class="grid-container">
                <div class="grid-item">                   
                    <label id="lblNombre" for="txtNombre"
                        >*{{ $t('tipoParametro.crear.nombre') }}</label
                    >
                </div>
                <div class="grid-item">
                    <InputText
                        id="txtNombre"
                        v-model="tipoParametroSeleccionado.nombre"
                        type="text"
                        with="500"
                        maxlength="65"
                        :placeholder="$t('tipoParametro.crear.placeholder_nombre')"                         
                        @input="(event) => permitirSoloLetrasYEspacios(event, tipoParametroSeleccionado, 'nombre')"
                    />
                </div>
                <div class="grid-item">                      
                    <InlineMessage                        
                        v-if="v$.tipoParametroSeleccionado.nombre.$error && v$.tipoParametroSeleccionado.nombre.$errors[0].$validator ==='required'"
                        id="imsCampoObligatorio"
                        >{{ v$.tipoParametroSeleccionado.nombre.$errors[0].$message }}</InlineMessage
                    >                 
                </div>     
                <div class="grid-item">
                    <label id="lblDescripcion" for="txtDescripcion"
                        >*{{ $t('tipoParametro.crear.descripcion') }}</label
                    >
                </div>
                <div class="grid-item">                    
                    <Textarea
                        id="txtDescripcion"
                        v-model="tipoParametroSeleccionado.descripcion"                       
                        maxlength="200"
                        :placeholder="$t('tipoParametro.crear.placeholder_descripcion')"                        
                        @input="(event) => permitirSoloLetrasYNumeros(event, tipoParametroSeleccionado, 'descripcion')"
                    />
                </div>
                <div class="grid-item">                   
                    <InlineMessage
                        v-if="v$.tipoParametroSeleccionado.descripcion.$error && v$.tipoParametroSeleccionado.descripcion.$errors[0].$validator ==='required' "
                        id="imsDescripcionObligatorio"
                        >{{ v$.tipoParametroSeleccionado.descripcion.$errors[0].$message }} 
                    </InlineMessage>         
                </div>       
            </div>        
        <template #footer>
            <div class="centrar-botones">
                <Button
                    id="btnActualizar"
                    type="button"
                    label="Aceptar"
                    class="p-button-success"
                    @click="actualizarTipoParametro()"
                />
                <Button
                    id="btnCancelarActualizacion"
                    type="button"
                    label="Cancelar"
                    class="p-button-secondary"
                    @click="resetearValoresActualizacion()"
                />
            </div>
        </template>
    </Dialog>
</template>

<script>
import usuarioStore from '@/store/UsuarioStore'
import useValidate from '@vuelidate/core'
import { required, helpers, maxLength, minLength } from '@vuelidate/validators'
import {
    obtenerListaTipoParametroPorEstado,
    eliminarTipoParametro,
    actualizarTipoParametro
} from '../servicios/TipoParametroServicio'
import { permitirSoloLetrasYEspacios, permitirSoloLetrasYNumeros, alphaWithSpaces, alphaNumWithSpaces } from '@/utilitarios/ValidacionesBase'

export default {
    data() {
        return {
            v$: useValidate(),
            mensajes: [],
            tiposParametros: [],
            mensajePantalla: '',
            campoObligatorio: false,
            estados: [
                { nombre: 'Activo', id: 'ACT' },
                { nombre: 'Inactivo', id: 'INA' }
            ],
            estadoSeleccionado: 'ACT',
            tipoParametroSeleccionado: {},
            eliminarTipoParametroDialog: false,
            actualizarTipoParametroDialog: false,
            campoObligatorioAct: false,
            mensaje: '',
            severidadMensaje: 'info'            
        }
    },   
    methods: {
        obtenerTokenUsuarioLogueado() {            
            return usuarioStore().getTokenUsuario
        },
        async obtenerTiposParametrosPorEstado() {
            let listaTiposParametros
            this.mensajePantalla = ''
            const token = this.obtenerTokenUsuarioLogueado()

            if (this.estadoSeleccionado === '') {
                this.campoObligatorio = true
                this.severidadMensaje = 'warn'
                this.mensajePantalla = 'Debe seleccionar un estado'
                return
            }

            await obtenerListaTipoParametroPorEstado(this.estadoSeleccionado, token).then((response) => {
                listaTiposParametros = response
            }).catch((error) => {
                this.severidadMensaje = 'error'
                this.mensajePantalla = `Se ha producido un error al tratar de eliminar el 
                        tipo parámetro con el siguiente error: ${error}`
            })

            this.tiposParametros = listaTiposParametros
            if (
                this.tiposParametros == null ||
                this.tiposParametros === undefined ||
                this.tiposParametros.length === 0
            ) {
                this.severidadMensaje = 'info'
                this.mensajePantalla = `La búsqueda realizada no ha generado ningún resultado`
            }
        },
        async eliminarTipoParametro() {
            const token = this.obtenerTokenUsuarioLogueado()
            const codigoTipoParametro = this.tipoParametroSeleccionado.codigo
            let respuesta = null
            this.mensaje = ''

            await eliminarTipoParametro(codigoTipoParametro, token)
                .then((response) => {
                    respuesta = response
                })
                .catch((error) => {
                    this.severidadMensaje = 'error'
                    this.mensajePantalla = `Se ha producido un error al tratar de eliminar el 
                        tipo parámetro con el siguiente error: ${error}`
                })

            const respuestaExitosa = 200
            if (respuesta.status === respuestaExitosa) {
                this.eliminarTipoParametroDialog = false
                this.obtenerTiposParametrosPorEstado()
                this.mensajePantalla = `El tipo parámetro con código: ${codigoTipoParametro} 
                        se ha eliminado exitósamente.`
            }
        },
        confirmarEliminarTipoParametro(tipoParametro) {
            this.tipoParametroSeleccionado = tipoParametro
            this.eliminarTipoParametroDialog = true
        },
        resetearDatos() {
            this.tiposParametros = null
            this.mensajePantalla = ''
            this.estadoSeleccionado = 'ACT'
            this.campoObligatorio = false
        },
        resetearValoresActualizacion() {
            this.mensajes = []
            this.v$.$reset()
            this.severidadMensaje = 'info'
            this.tipoParametroSeleccionado = {}
            this.actualizarTipoParametroDialog = false
            this.campoObligatorioAct = false            
        },
        habilitarDialogoActualizarTipoParametro(tipoParametro) {
            this.tipoParametroSeleccionado = { ...tipoParametro }
            this.mensaje = ''
            this.actualizarTipoParametroDialog = true
        },        
        validarCamposRequeridos() {
            this.mensajes = []
            this.v$.$reset()
            this.v$.$validate()          
            if (this.v$.$error) {
                this.setearMensajesErrorValidaciones(this.v$.$errors)
                this.campoObligatorioAct = true                
            } else {
                this.campoObligatorioAct = false
                this.mensajes = []
            }           
        },
        setearMensajesErrorValidaciones(errores){
            Object.keys(errores).forEach((i) => {
                if(errores[i].$validator !=='required'){
                     this.mensajes[i] = errores[i].$message
                }
            })            
        },
        async actualizarTipoParametro() {
            let respuestaServicio = null
            const token = this.obtenerTokenUsuarioLogueado()

            this.validarCamposRequeridos()
            if (this.campoObligatorioAct || this.mensajes.length>0) {
                this.severidadMensaje = 'warn'                
            } else {
                await actualizarTipoParametro(
                    this.tipoParametroSeleccionado.codigo,
                    this.tipoParametroSeleccionado.nombre,
                    this.tipoParametroSeleccionado.descripcion,token
                ).then((response) => {
                        respuestaServicio = response
                        this.resetearValoresActualizacion()
                        this.resetearDatos()
                        if (respuestaServicio === undefined || respuestaServicio == null) {
                            this.severidadMensaje = 'error'
                            this.mensajePantalla = 'Error al crear tipo parametro.'
                        } else {
                            this.severidadMensaje = 'success'
                            this.mensajePantalla = `El tipo parametro de código: ${respuestaServicio.data.codigo} 
                                ha sido actualizado exitosamente.`
                        }
                    })
                    .catch((error) => {
                        this.resetearValoresActualizacion()
                        this.severidadMensaje = 'error'
                        this.mensajePantalla = `Error al tratar de actualizar el tipo parametro, causa: ${error.cause.message}`
                    })
            }
        },
        permitirSoloLetrasYEspacios(event, contexto, propiedad) {                    
          permitirSoloLetrasYEspacios(event, contexto, propiedad) 
        },
        permitirSoloLetrasYNumeros(event, contexto, propiedad) {          
          permitirSoloLetrasYNumeros(event, contexto, propiedad)          
        }   
    },
    validations() {
        return {
            tipoParametroSeleccionado: {
                nombre: { 
                    required: helpers.withMessage(this.$t('mensaje.requerido'), required), 
                    maxLength: helpers.withMessage('Nombre: el número máximo de caracteres permitidos es de 65.', maxLength(65)),
                    minLength: helpers.withMessage('Nombre: el número mínimo de caracteres permitidos es de 10.', minLength(10)),
                    alphaWithSpaces: helpers.withMessage('Nombre: solo se permite ingresar letras.', alphaWithSpaces)
                },
                descripcion: {
                    required: helpers.withMessage(this.$t('mensaje.requerido'), required), 
                    minLength: helpers.withMessage('Descripción: el número mínimo de caracteres permitidos es de 50.', minLength(50)),
                    maxLength: helpers.withMessage('Descripción: el número máximo de caracteres permitidos es de 200.', maxLength(200)),
                    alphaNumWithSpaces: helpers.withMessage('Descripción: solo se permite ingresar letras y números', alphaNumWithSpaces), 
                }
            }
        }
    }
}
</script>
