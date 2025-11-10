
    console.log("Appjs cargado");
    const API_URL = "http://localhost:1337/api/productos";
    const form = document.getElementById("form-producto");
    const tabla = document.getElementById("tabla-productos");
    const idInput = document.getElementById("id");
    const footer = document.querySelector("footer"); // ➕ NUEVO

    async function cargarTabla() {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        tabla.innerHTML = "";

        if (!data.data || data.data.length === 0) {
          tabla.innerHTML = `<tr><td colspan="6" class="text-center text-muted">No hay productos registrados.</td></tr>`;
        } else {
          data.data.forEach((item, i) => {
            const fila = document.createElement("tr");
            fila.setAttribute("data-docid", item.documentId);

            fila.innerHTML = `
              <td>${i + 1}</td>
              <td>${item.nombre}</td>
              <td>$${item.precio.toFixed(2)}</td>
              <td>${item.categoria}</td>
              <td>${item.disponible ? "Sí" : "No"}</td>
              <td>
                <button class="btn btn-warning btn-sm btn-editar">Editar</button>
                <button class="btn btn-danger btn-sm btn-eliminar">Eliminar</button>
              </td>
            `;

            tabla.appendChild(fila);
          });
        }

        // ➕ NUEVO: Mostrar hora de última actualización
        const ahora = new Date();
        const horaFormateada = ahora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        footer.textContent = `Última actualización: ${horaFormateada} | © 2025 Restaurante "Sabores del Alma" | Sistema de Gestión`;

      } catch (error) {
        console.error("Error al cargar productos:", error);
      }
    }

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const producto = {
        nombre: document.getElementById("nombre").value,
        precio: parseFloat(document.getElementById("precio").value),
        categoria: document.getElementById("categoria").value,
        disponible: document.getElementById("disponible").checked
      };

      const docId = idInput.value;
      const url = docId ? `${API_URL}/${docId}` : API_URL;
      const method = docId ? "PUT" : "POST";

      try {
        await fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data: producto })
        });

        idInput.value = "";
        form.reset();
        cargarTabla(); // mantiene la hora actualizada
      } catch (error) {
        console.error("Error al guardar producto:", error);
      }
    });

    tabla.addEventListener("click", async (e) => {
      const fila = e.target.closest("tr");
      if (!fila) return;

      const docId = fila.getAttribute("data-docid");
      const celdas = fila.querySelectorAll("td");

      if (e.target.classList.contains("btn-editar")) {
        document.getElementById("nombre").value = celdas[1].textContent;
        document.getElementById("precio").value = celdas[2].textContent.replace("$", "");
        document.getElementById("categoria").value = celdas[3].textContent;
        document.getElementById("disponible").checked = celdas[4].textContent === "Sí";
        idInput.value = docId;
      }

      if (e.target.classList.contains("btn-eliminar")) {
        if (confirm("¿Deseas eliminar este producto?")) {
          try {
            await fetch(`${API_URL}/${docId}`, { method: "DELETE" });
            cargarTabla(); // mantiene la hora actualizada
          } catch (error) {
            console.error("Error al eliminar producto:", error);
          }
        }
      }
    });

    cargarTabla();
  