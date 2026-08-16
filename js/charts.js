/**
 * charts.js
 * Renderiza os gráficos da seção "Pesquisa de campo" usando Chart.js.
 * Os dados abaixo são placeholders estruturados — SUBSTITUIR pelos dados
 * reais da pesquisa de campo assim que estiverem disponíveis.
 */

window.Pluvion = window.Pluvion || {};

// SUBSTITUIR PELOS DADOS REAIS DA PESQUISA DE CAMPO
const researchData = {
  frequenciaAlagamentos: {
    labels: ['Nunca', 'Raramente', 'Às vezes', 'Frequentemente', 'Sempre'],
    values: [4, 12, 28, 34, 22],
  },
  tempoPercepcaoRisco: {
    labels: ['Sim', 'Não'],
    values: [50.8, 49.2],
  },
  sistemaDrenagem: {
    labels: ['Sim', 'Não', 'Não Sei'],
    values: [15.9, 74.6, 9.5],
  },
prejuizoComunidade: {
    labels: ['Sim, muitos', 'Sim, alguns', 'Não'],
    values: [10, 30, 60],
  },
  residentesRegiao: {
    labels: ['São Paulo', 'Taboão da Serra', 'Embu das Artes', 'Itapecerica da Serra', 'Outros'],
    values: [27.7, 58.7, 4, 2.8, 6.8],
  },
  seaEvitariaPrejuizos: {
    labels: ['Sim', 'Não'],
    values: [93.7, 6.3],
  }
  
};

const CHART_COLORS = ['#527D93', '#279C6B', '#E7A93D', '#E2672C', '#C31F3D'];

function getComputedColor(varName, fallback) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(varName);
  return value?.trim() || fallback;
}

function baseOptions(interpretationId) {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: { font: { family: 'Inter', size: 11 }, boxWidth: 10, padding: 14 },
      },
      tooltip: {
        backgroundColor: '#16232B',
        titleFont: { family: 'Inter' },
        bodyFont: { family: 'Inter' },
        padding: 10,
        cornerRadius: 8,
      },
    },
  };
}

async function loadChartJs() {
  if (window.Chart) return window.Chart;
  await new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'js/vendor/chart.umd.min.js';
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
  return window.Chart;
}

Pluvion.initCharts = async function () {
  const canvases = document.querySelectorAll('[data-chart]');
  if (canvases.length === 0) return;

  let Chart;
  try {
    Chart = await loadChartJs();
  } catch (error) {
    canvases.forEach((canvas) => {
      const wrap = canvas.closest('.chart-card__canvas-wrap');
      if (wrap) {
        wrap.innerHTML = '<p class="field-hint">Não foi possível carregar os gráficos agora.</p>';
      }
    });
    return;
  }

  const textColor = getComputedColor('--color-text-soft', '#3E4C53');
  Chart.defaults.color = textColor;
  Chart.defaults.font.family = 'Inter';

  canvases.forEach((canvas) => {
    const type = canvas.dataset.chart;
    const datasetKey = canvas.dataset.dataset;
    const dataset = researchData[datasetKey];
    if (!dataset) return;

    new Chart(canvas, {
      type,
      data: {
        labels: dataset.labels,
        datasets: [
          {
            label: canvas.dataset.label || 'Respostas (%)',
            data: dataset.values,
            backgroundColor: type === 'line' ? 'rgba(82, 125, 147, 0.16)' : CHART_COLORS,
            borderColor: type === 'line' ? '#527D93' : '#fff',
            borderWidth: type === 'doughnut' ? 2 : type === 'line' ? 2 : 0,
            borderRadius: type === 'bar' ? 8 : 0,
            tension: 0.35,
            fill: type === 'line',
          },
        ],
      },
      options: baseOptions(),
    });
  });
};
