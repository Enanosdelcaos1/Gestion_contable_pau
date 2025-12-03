

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jzpnichqlwmyopbhvmes.supabase.co'
const supabaseKey = 'sb_publishable_07AaD22FyXkicbq1eocluQ_fC_YbqDg'
const supabase = sb_secret_jNyiWf8tEVlgjNkpZ8i8IA_uGdqtiU0




// importar un array, por que lo vamos a utilizar
import { movimientos} from './data.js';

function initSupabase() {
    if (window.supabase) {
        superbase = window.supabase.createClient(supabaseUrl, supabaseKey);
        console.log('Supabase initialized');
    }

    async function guardarEn Supabase(movimiento) {
       if (!supabase) {
        console.error('Supabase no está inicializado');
        return null;
       }
        const { data, error } = await supabase
            .from('gestionPAU')
            .insert([movimiento]);
            .select();
        if (error) {
            console.error('Error al guardar en Supabase:', error);
            return null;
        }

        return data;
    }
}




// Dom de los modos del formulario
const form=document.getElementById('formulario');
const concepto=document.getElementById('concepto');
const importe=document.getElementById('importe');
const tipo=document.getElementById('tipo');


// evento submit del formulario
form.addEventListener('submit', function(event){
    event.preventDefault(); // prevenir el envio del formulario por defecto

    // obtener los valores del formulario
    const conceptoValue=concepto.value;
    const importeValue=parseFloat(importe.value);
    const tipoValue=tipo.value;

    // toda imformacion que optenemos de .value tiene que ser un objeto, y cada objeto se almacena en el array movimientos
    const movimiento={
        concepto: conceptoValue,
        importe: importeValue,
        tipo: tipoValue

        //añadir el nuevo movimiento al array movimientos
    };
    movimientos.push(movimiento);
    // limpiar el formulario
    form.reset();
    

    // mostrar los movimientos (llamada a funciones de apoyo)
    console.log(movimientos);

    // llamar a una funcion, que sera la funcion de introducir los movimientos en la tabla
    
    agregarMovimientosTabla(movimiento);
    calcularBalance();

    //funcion para agregar un moavimiento a la tabla en el html
    function agregarMovimientosTabla(movimiento){
        // ERROR: El id 'intoduciMovimientos' no existe en el HTML. Debes usar 'movimientos-body'.
        const tabla=document.getElementById('movimientos-body'); // <-- id correcto
        const nuevaFila=document.createElement('tr');

        const celdaConcepto=document.createElement('td');
        const celdaImporte=document.createElement('td');
        const celdaTipo=document.createElement('td');    

        celdaConcepto.textContent=movimiento.concepto;
        celdaImporte.textContent=movimiento.importe.toFixed(2);
        celdaTipo.textContent=movimiento.tipo;

        nuevaFila.appendChild(celdaConcepto);
        nuevaFila.appendChild(celdaTipo);
        nuevaFila.appendChild(celdaImporte);
        tabla.appendChild(nuevaFila);
    }
            
// una funcion que suma todos los gastos e ingresoso y luego nos hace el balance ingresos - gastos
function calcularBalance(){
    let totalIngresos=0;
    let totalGastos=0;
    movimientos.forEach(function(movimiento){
        if(movimiento.tipo==='ingreso'){
            totalIngresos += movimiento.importe;
        } else if(movimiento.tipo==='gasto'){
            totalGastos += movimiento.importe;
        }
    });
    // Actualizar los valores en las tarjetas debajo de la tabla
    document.getElementById('cardIngresos').textContent = totalIngresos.toFixed(2) + ' €';
    document.getElementById('cardGastos').textContent = totalGastos.toFixed(2) + ' €';
    const balanceTotal = totalIngresos - totalGastos;
    document.getElementById('cardBalance').textContent = balanceTotal.toFixed(2) + ' €';
}
});