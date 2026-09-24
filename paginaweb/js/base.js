document.addEventListener('DOMContentLoaded', () => {
  const botonHamburguesa = document.getElementById('btnHamburguesa');
  const navMenu = document.getElementById('navMenu');
  const itemsDesplegables = document.querySelectorAll('.nav-item--desplegable');

  if (botonHamburguesa && navMenu) {
    botonHamburguesa.addEventListener('click', () => {
      const estaAbierto = navMenu.classList.contains('abierto');
      botonHamburguesa.classList.toggle('activo');
      navMenu.classList.toggle('abierto');
      botonHamburguesa.setAttribute('aria-expanded', !estaAbierto);
    });

    itemsDesplegables.forEach(item => {
      const enlacePadre = item.querySelector('.nav-enlace');
      enlacePadre.addEventListener('click', (e) => {
        if (window.innerWidth < 768) {
          if (!item.classList.contains('abierto')) {
            e.preventDefault();
            itemsDesplegables.forEach(i => i.classList.remove('abierto'));
            item.classList.add('abierto');
          }
        }
      });
    });

    const enlacesNav = document.querySelectorAll('.nav-enlace:not(.nav-item--desplegable > .nav-enlace), .submenu-enlace');
    enlacesNav.forEach(enlace => {
      enlace.addEventListener('click', () => {
        if (window.innerWidth < 768) {
          botonHamburguesa.classList.remove('activo');
          navMenu.classList.remove('abierto');
          itemsDesplegables.forEach(i => i.classList.remove('abierto'));
        }
      });
    });
  }

  const filtroBotones = document.querySelectorAll('.filtro-btn');
  const itemsGaleria = document.querySelectorAll('.galeria-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitulo = document.getElementById('lightboxTitulo');
  const lightboxDesc = document.getElementById('lightboxDesc');
  const btnCerrarLightbox = document.getElementById('btnCerrarLightbox');
  const btnPrev = document.getElementById('btnPrevLightbox');
  const btnNext = document.getElementById('btnNextLightbox');

  let indiceActual = 0;
  let itemsVisibles = [];

  const actualizarItemsVisibles = () => {
    itemsVisibles = Array.from(itemsGaleria).filter(item => !item.classList.contains('oculto'));
  };

  if (filtroBotones.length > 0) {
    filtroBotones.forEach(btn => {
      btn.addEventListener('click', () => {
        filtroBotones.forEach(b => b.classList.remove('activo'));
        btn.classList.add('activo');

        const categoria = btn.getAttribute('data-categoria');

        itemsGaleria.forEach(item => {
          const itemCat = item.getAttribute('data-categoria');
          if (categoria === 'todos' || itemCat === categoria) {
            item.classList.remove('oculto');
          } else {
            item.classList.add('oculto');
          }
        });

        actualizarItemsVisibles();
      });
    });

    actualizarItemsVisibles();
  }

  const abrirLightbox = (indice) => {
    if (!lightbox || itemsVisibles.length === 0) return;
    indiceActual = indice;
    const item = itemsVisibles[indiceActual];
    const img = item.querySelector('img');
    const titulo = item.querySelector('.galeria-overlay h4')?.textContent || 'Better Call Saul';
    const desc = item.querySelector('.galeria-overlay p')?.textContent || '';

    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxTitulo.textContent = titulo;
    lightboxDesc.textContent = desc;

    lightbox.classList.add('abierto');
    document.body.style.overflow = 'hidden';
  };

  const cerrarLightbox = () => {
    if (!lightbox) return;
    lightbox.classList.remove('abierto');
    document.body.style.overflow = '';
  };

  const navegarLightbox = (direccion) => {
    if (itemsVisibles.length === 0) return;
    indiceActual = (indiceActual + direccion + itemsVisibles.length) % itemsVisibles.length;
    abrirLightbox(indiceActual);
  };

  if (lightbox) {
    itemsGaleria.forEach(item => {
      item.addEventListener('click', () => {
        actualizarItemsVisibles();
        const index = itemsVisibles.indexOf(item);
        if (index !== -1) {
          abrirLightbox(index);
        }
      });
    });

    btnCerrarLightbox?.addEventListener('click', cerrarLightbox);
    btnPrev?.addEventListener('click', () => navegarLightbox(-1));
    btnNext?.addEventListener('click', () => navegarLightbox(1));

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        cerrarLightbox();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('abierto')) return;
      if (e.key === 'Escape') cerrarLightbox();
      if (e.key === 'ArrowLeft') navegarLightbox(-1);
      if (e.key === 'ArrowRight') navegarLightbox(1);
    });
  }

  const formContacto = document.getElementById('formularioContacto');
  const modalFeedback = document.getElementById('modalFeedback');
  const btnCerrarModalFeedback = document.getElementById('btnCerrarModalFeedback');
  const feedbackNombre = document.getElementById('feedbackNombre');

  if (formContacto) {
    formContacto.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!formContacto.checkValidity()) {
        formContacto.reportValidity();
        return;
      }

      const inputNombre = document.getElementById('nombre');
      const nombreCliente = inputNombre ? inputNombre.value.trim() : 'Estimado Fan';

      if (feedbackNombre) {
        feedbackNombre.textContent = nombreCliente;
      }

      if (modalFeedback) {
        modalFeedback.classList.add('activo');
      }

      formContacto.reset();
    });

    btnCerrarModalFeedback?.addEventListener('click', () => {
      modalFeedback.classList.remove('activo');
    });

    modalFeedback?.addEventListener('click', (e) => {
      if (e.target === modalFeedback) {
        modalFeedback.classList.remove('activo');
      }
    });
  }

  const btnIniciarTrivia = document.getElementById('btnIniciarTrivia');
  const triviaBienvenida = document.getElementById('triviaBienvenida');
  const triviaFlujo = document.getElementById('triviaFlujo');
  const formTrivia = document.getElementById('formularioTrivia');
  const resultadoTrivia = document.getElementById('triviaResultado');
  const puntajeNumero = document.getElementById('puntajeNumero');
  const puntajeTitulo = document.getElementById('puntajeTitulo');
  const puntajeMensaje = document.getElementById('puntajeMensaje');
  const btnReiniciarTrivia = document.getElementById('btnReiniciarTrivia');
  const barraRelleno = document.getElementById('triviaBarraRelleno');
  const pasoIndicador = document.getElementById('triviaPasoIndicador');
  const pasos = document.querySelectorAll('.trivia-paso');

  let pasoActual = 1;
  const totalPasos = 5;

  const actualizarPaso = (nuevoPaso) => {
    pasoActual = nuevoPaso;
    pasos.forEach((p, idx) => {
      p.classList.toggle('activo', idx + 1 === pasoActual);
    });
    if (barraRelleno) {
      barraRelleno.style.width = `${(pasoActual / totalPasos) * 100}%`;
    }
    if (pasoIndicador) {
      pasoIndicador.textContent = `Pregunta ${pasoActual} de ${totalPasos}`;
    }
  };

  if (btnIniciarTrivia && triviaFlujo && triviaBienvenida) {
    btnIniciarTrivia.addEventListener('click', () => {
      triviaBienvenida.style.display = 'none';
      triviaFlujo.classList.add('desplegado');
      actualizarPaso(1);
    });

    document.querySelectorAll('.btn-trivia-siguiente').forEach(btn => {
      btn.addEventListener('click', () => {
        const seleccionada = formTrivia.querySelector(`input[name="p${pasoActual}"]:checked`);
        if (!seleccionada) {
          alert('Por favor selecciona una opción antes de continuar.');
          return;
        }
        if (pasoActual < totalPasos) {
          actualizarPaso(pasoActual + 1);
        }
      });
    });

    document.querySelectorAll('.btn-trivia-anterior').forEach(btn => {
      btn.addEventListener('click', () => {
        if (pasoActual > 1) {
          actualizarPaso(pasoActual - 1);
        }
      });
    });

    formTrivia?.addEventListener('submit', (e) => {
      e.preventDefault();

      const seleccionadaPasoFinal = formTrivia.querySelector(`input[name="p${totalPasos}"]:checked`);
      if (!seleccionadaPasoFinal) {
        alert('Por favor selecciona tu respuesta a la última pregunta.');
        return;
      }

      let puntos = 0;
      for (let i = 1; i <= totalPasos; i++) {
        const sel = formTrivia.querySelector(`input[name="p${i}"]:checked`);
        if (sel) {
          puntos += parseInt(sel.value, 10);
        }
      }

      if (puntajeNumero) {
        puntajeNumero.textContent = `${puntos} / ${totalPasos}`;
      }

      if (puntajeTitulo && puntajeMensaje) {
        if (puntos === 5) {
          puntajeTitulo.textContent = '¡Socio Honorario de HHM!';
          puntajeMensaje.textContent = '¡Impresionante! Tienes un conocimiento perfecto de la serie, digno de Chuck McGill y la audacia de Saul Goodman. ¡Caso ganado!';
        } else if (puntos >= 3) {
          puntajeTitulo.textContent = '¡Abogado Litigante Astuto!';
          puntajeMensaje.textContent = '¡Muy buen trabajo! Tienes el ojo clínico de Kim Wexler y sabes zafar en el tribunal. Solo te faltaron un par de detalles para la perfección.';
        } else {
          puntajeTitulo.textContent = '¡Necesitas Llamar a Saul!';
          puntajeMensaje.textContent = 'Obtuviste un puntaje modesto. Te recomendamos hacer una buena maratón de las 6 temporadas antes de que Lalo Salamanca te interrogue.';
        }
      }

      triviaFlujo.style.display = 'none';
      resultadoTrivia.classList.add('visible');
      resultadoTrivia.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });

    btnReiniciarTrivia?.addEventListener('click', () => {
      formTrivia.reset();
      resultadoTrivia.classList.remove('visible');
      triviaFlujo.style.display = '';
      triviaFlujo.classList.remove('desplegado');
      triviaBienvenida.style.display = 'block';
      actualizarPaso(1);
      document.getElementById('trivia')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
});
