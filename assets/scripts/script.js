document.addEventListener("DOMContentLoaded", function() {
 /* Inicio de arreglos con objetos */
    const listaTareas = [
      { id: 1, descripcion: "Tarea 1", completado: false },
      { id: 2, descripcion: "Tarea 2", completado: false },
      { id: 3, descripcion: "Tarea 3", completado: false }
  ];
/* Declaracion de variables */
  const inputTarea = document.getElementById("inputTarea");
  const btnAgregar = document.getElementById("btnAgregar");
  const lista1 = document.getElementById("lista1");
  const lista2 = document.getElementById("lista2");
  const text1 = document.getElementById("text1");
  const text2 = document.getElementById("text2");

  function actualizarContadores() {
      const totalTareas = listaTareas.length;
      const totalRealizadas = listaTareas.filter(tarea => tarea.completado).length;
      text1.textContent = totalTareas;
      text2.textContent = totalRealizadas;
      text1.classList.add("bold");/* negritas los numeros de realizadas y total */
      text2.classList.add("bold");/* negritas los numeros de realizadas y total */
  }

  function renderizarTareas() {
      lista1.innerHTML = "";
      lista2.innerHTML = "";
      listaTareas.forEach(tarea => {
          const codigoAleatorio = Math.floor(Math.random() * 1000); /* Con esta propiedad puedo crear numeros aleatorios para los ID */
          const li1 = document.createElement("li");
          li1.textContent = codigoAleatorio;
          lista1.appendChild(li1);

          const li2 = document.createElement("li");
          lista2.appendChild(li2);

          const taskContainer = document.createElement("div");
          taskContainer.classList.add("task-container");
          li2.appendChild(taskContainer);

          const spanDescripcion = document.createElement("span");
          spanDescripcion.textContent = tarea.descripcion;
          taskContainer.appendChild(spanDescripcion);

          const checkboxContainer = document.createElement("div");
          checkboxContainer.classList.add("checkbox-container");
          taskContainer.appendChild(checkboxContainer);

          const checkboxRealizado = document.createElement("input");
          checkboxRealizado.type = "checkbox";
          checkboxRealizado.style.marginLeft = "10px";
          checkboxRealizado.checked = tarea.completado;
          checkboxRealizado.addEventListener("change", function() {
              tarea.completado = checkboxRealizado.checked;
              actualizarContadores();
          });
          checkboxContainer.appendChild(checkboxRealizado);
          checkboxContainer.style.marginRight = "5px";

          const btnEliminar = document.createElement("button");
          btnEliminar.classList.add("btn-delete");
          btnEliminar.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
          btnEliminar.addEventListener("click", function() {
              const indice = listaTareas.indexOf(tarea);
              if (indice !== -1) {
                  listaTareas.splice(indice, 1);
                  renderizarTareas();
                  actualizarContadores();
              }
          });
          taskContainer.appendChild(btnEliminar);
          btnEliminar.style.marginLeft = "5px";

          if (tarea.completado) {
              spanDescripcion.classList.add("completado");
          } else {
              spanDescripcion.classList.remove("completado");
          }
      });
      actualizarContadores();
  }

  btnAgregar.addEventListener("click", function() {
      const descripcion = inputTarea.value.trim();
      if (descripcion !== "") {
          const nuevaTarea = {
              id: listaTareas.length + 1,
              descripcion: descripcion,
              completado: false
          };
          listaTareas.push(nuevaTarea);
          renderizarTareas();
          inputTarea.value = "";
      }
  });

  renderizarTareas();
});
