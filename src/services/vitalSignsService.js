// Servicio para manejo de signos vitales
// Este módulo encapsula toda la lógica de datos de salud física
// para facilitar la integración futura con dispositivos o APIs reales

import AsyncStorage from '@react-native-async-storage/async-storage';

// Configuración de rangos normales para cada signo vital
export const VITAL_RANGES = {
  heartRate: {
    normal: { min: 60, max: 100 },
    warning: { min: 50, max: 120 },
    unit: 'bpm',
    name: 'Heart Rate'
  },
  bloodOxygen: {
    normal: { min: 95, max: 100 },
    warning: { min: 90, max: 94 },
    unit: '%',
    name: 'Blood Oxygen'
  },
  temperature: {
    normal: { min: 36.1, max: 37.2 },
    warning: { min: 35.0, max: 38.0 },
    unit: '°C',
    name: 'Body Temperature'
  },
  weight: {
    // El rango normal depende de cada persona, aquí valores por defecto
    normal: { min: 50, max: 100 },
    warning: { min: 40, max: 120 },
    unit: 'kg',
    name: 'Weight'
  },
  bloodPressure: {
    normal: { systolic: { min: 90, max: 120 }, diastolic: { min: 60, max: 80 } },
    warning: { systolic: { min: 140, max: 180 }, diastolic: { min: 90, max: 120 } },
    unit: 'mmHg',
    name: 'Blood Pressure'
  }
};

// Generar datos mock realistas
const generateRealisticValue = (type, trend = 'stable') => {
  const ranges = VITAL_RANGES[type];
  let baseValue;
  
  switch (type) {
    case 'heartRate':
      baseValue = 72 + (Math.random() - 0.5) * 20;
      break;
    case 'bloodOxygen':
      baseValue = 98 + (Math.random() - 0.5) * 4;
      break;
    case 'temperature':
      baseValue = 36.5 + (Math.random() - 0.5) * 1;
      break;
    case 'weight':
      // Este sería mejor obtenerlo de perfil del usuario
      baseValue = 70 + (Math.random() - 0.5) * 20;
      break;
    default:
      baseValue = ranges.normal.min + Math.random() * (ranges.normal.max - ranges.normal.min);
  }

  // Aplicar tendencia
  const trendFactor = trend === 'up' ? 1.1 : trend === 'down' ? 0.9 : 1;
  return Math.round(baseValue * trendFactor * 10) / 10;
};

// Determinar estado basado en valor y rangos
const determineStatus = (value, type, isBloodPressure = false) => {
  const ranges = VITAL_RANGES[type];
  
  if (isBloodPressure) {
    const { systolic, diastolic } = value;
    const sysNormal = ranges.normal.systolic;
    const diasNormal = ranges.normal.diastolic;
    const sysWarning = ranges.warning.systolic;
    const diasWarning = ranges.warning.diastolic;
    
    if (systolic >= sysNormal.min && systolic <= sysNormal.max && 
        diastolic >= diasNormal.min && diastolic <= diasNormal.max) {
      return 'normal';
    } else if (systolic <= sysWarning.max && diastolic <= diasWarning.max) {
      return 'warning';
    } else {
      return 'danger';
    }
  } else {
    if (value >= ranges.normal.min && value <= ranges.normal.max) {
      return 'normal';
    } else if (value >= ranges.warning.min && value <= ranges.warning.max) {
      return 'warning';
    } else {
      return 'danger';
    }
  }
};

// Clase principal para manejo de signos vitales
export class VitalSignsService {
  constructor() {
    this.storageKey = 'vital_signs_data';
    this.lastUpdateKey = 'vital_signs_last_update';
  }

  // Generar datos mock (será reemplazado por datos reales)
  generateMockData() {
    const trends = ['up', 'down', 'stable'];
    const getRandomTrend = () => trends[Math.floor(Math.random() * trends.length)];
    
    const heartRate = generateRealisticValue('heartRate', getRandomTrend());
    const bloodOxygen = generateRealisticValue('bloodOxygen', getRandomTrend());
    const temperature = generateRealisticValue('temperature', getRandomTrend());
    const weight = generateRealisticValue('weight', getRandomTrend());
    
    const systolic = Math.round(generateRealisticValue('heartRate') * 1.6); // Aproximación
    const diastolic = Math.round(systolic * 0.67); // Aproximación
    
    return {
      heartRate: {
        value: heartRate,
        unit: VITAL_RANGES.heartRate.unit,
        status: determineStatus(heartRate, 'heartRate'),
        trend: getRandomTrend(),
        lastUpdated: new Date(),
        source: 'mock' // Identificar fuente de datos
      },
      bloodOxygen: {
        value: bloodOxygen,
        unit: VITAL_RANGES.bloodOxygen.unit,
        status: determineStatus(bloodOxygen, 'bloodOxygen'),
        trend: getRandomTrend(),
        lastUpdated: new Date(),
        source: 'mock'
      },
      temperature: {
        value: temperature,
        unit: VITAL_RANGES.temperature.unit,
        status: determineStatus(temperature, 'temperature'),
        trend: getRandomTrend(),
        lastUpdated: new Date(),
        source: 'mock'
      },
      weight: {
        value: weight,
        unit: VITAL_RANGES.weight.unit,
        status: determineStatus(weight, 'weight'),
        trend: getRandomTrend(),
        lastUpdated: new Date(),
        source: 'mock'
      },
      bloodPressure: {
        systolic,
        diastolic,
        unit: VITAL_RANGES.bloodPressure.unit,
        status: determineStatus({ systolic, diastolic }, 'bloodPressure', true),
        trend: getRandomTrend(),
        lastUpdated: new Date(),
        source: 'mock'
      }
    };
  }

  // Obtener signos vitales (mock o reales)
  async getVitalSigns(forceRefresh = false) {
    try {
      const lastUpdate = await AsyncStorage.getItem(this.lastUpdateKey);
      const cachedData = await AsyncStorage.getItem(this.storageKey);
      
      // Si hay datos cacheados y no se fuerza refresh, usar cache
      if (!forceRefresh && cachedData && lastUpdate) {
        const lastUpdateTime = new Date(lastUpdate);
        const now = new Date();
        const timeDiff = now - lastUpdateTime;
        
        // Usar cache si es menor a 5 minutos
        if (timeDiff < 5 * 60 * 1000) {
          return JSON.parse(cachedData);
        }
      }
      
      // Generar nuevos datos (aquí iría la llamada a dispositivos reales)
      const newData = this.generateMockData();
      
      // Guardar en cache
      await AsyncStorage.setItem(this.storageKey, JSON.stringify(newData));
      await AsyncStorage.setItem(this.lastUpdateKey, new Date().toISOString());
      
      return newData;
    } catch (error) {
      console.error('Error getting vital signs:', error);
      // Fallback a datos mock
      return this.generateMockData();
    }
  }

  // Guardar signo vital manual (para cuando el usuario ingrese datos)
  async saveVitalSign(type, value, source = 'manual') {
    try {
      const currentData = await this.getVitalSigns();
      
      if (type === 'bloodPressure') {
        currentData.bloodPressure = {
          ...value,
          unit: VITAL_RANGES.bloodPressure.unit,
          status: determineStatus(value, 'bloodPressure', true),
          trend: this.calculateTrend(currentData.bloodPressure, value),
          lastUpdated: new Date(),
          source
        };
      } else {
        currentData[type] = {
          value,
          unit: VITAL_RANGES[type].unit,
          status: determineStatus(value, type),
          trend: this.calculateTrend(currentData[type], value),
          lastUpdated: new Date(),
          source
        };
      }
      
      await AsyncStorage.setItem(this.storageKey, JSON.stringify(currentData));
      return currentData;
    } catch (error) {
      console.error('Error saving vital sign:', error);
      throw error;
    }
  }

  // Calcular tendencia comparando valores
  calculateTrend(oldData, newValue) {
    if (!oldData || !oldData.value) return 'stable';
    
    const oldVal = typeof oldData.value === 'object' ? 
      (oldData.value.systolic || oldData.value) : oldData.value;
    const newVal = typeof newValue === 'object' ? 
      (newValue.systolic || newValue) : newValue;
    
    const diff = newVal - oldVal;
    const threshold = oldVal * 0.05; // 5% de diferencia
    
    if (diff > threshold) return 'up';
    if (diff < -threshold) return 'down';
    return 'stable';
  }

  // Obtener historial de un signo vital específico
  async getVitalHistory(type, days = 7) {
    // Aquí se implementaría la lógica para obtener historial
    // Por ahora retorna datos mock
    const history = [];
    const now = new Date();
    
    for (let i = days; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      
      history.push({
        date,
        value: generateRealisticValue(type),
        status: Math.random() > 0.8 ? 'warning' : 'normal'
      });
    }
    
    return history;
  }

  // Limpiar cache
  async clearCache() {
    try {
      await AsyncStorage.removeItem(this.storageKey);
      await AsyncStorage.removeItem(this.lastUpdateKey);
    } catch (error) {
      console.error('Error clearing cache:', error);
    }
  }
}

// Instancia singleton
export const vitalSignsService = new VitalSignsService();

// Utilidades adicionales
export const formatVitalValue = (data, type) => {
  if (type === 'bloodPressure') {
    return `${data.systolic}/${data.diastolic}`;
  }
  return data.value.toString();
};

export const getVitalRecommendation = (type, status) => {
  const recommendations = {
    heartRate: {
      normal: "Your heart rate is in a healthy range! Keep up your regular exercise routine.",
      warning: "Consider monitoring your heart rate more closely. Stay hydrated and avoid excessive caffeine.",
      danger: "Please consult with a healthcare professional about your heart rate readings."
    },
    bloodOxygen: {
      normal: "Excellent oxygen levels! Your respiratory system is functioning well.",
      warning: "Consider deep breathing exercises and ensure good air quality around you.",
      danger: "Low oxygen levels require immediate medical attention."
    },
    temperature: {
      normal: "Your body temperature is normal and healthy.",
      warning: "Monitor your temperature closely. Stay hydrated and rest if needed.",
      danger: "Abnormal temperature readings require medical evaluation."
    },
    weight: {
      normal: "Your weight is within a healthy range for monitoring.",
      warning: "Consider consulting with a nutritionist for personalized advice.",
      danger: "Significant weight changes should be discussed with a healthcare provider."
    },
    bloodPressure: {
      normal: "Your blood pressure is in a healthy range. Maintain your current lifestyle!",
      warning: "Monitor your blood pressure regularly. Consider reducing sodium and increasing exercise.",
      danger: "High blood pressure readings require immediate medical attention."
    }
  };
  
  return recommendations[type]?.[status] || "Continue monitoring this vital sign regularly.";
};