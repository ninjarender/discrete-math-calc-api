class SetsService {
  compareItems(item1, item2) {
    // Якщо обидва елементи одного типу, порівнюємо напряму
    if (typeof item1 === typeof item2) {
      return item1 === item2;
    }
    // Якщо різні типи, конвертуємо в рядки для порівняння
    return String(item1) === String(item2);
  }

  union(set1, set2) {
    // Використовуємо Map для збереження унікальних значень з урахуванням типів
    const uniqueMap = new Map();
    
    [...set1, ...set2].forEach(item => {
      const key = typeof item === 'number' ? `n:${item}` : `s:${item}`;
      uniqueMap.set(key, item);
    });

    return Array.from(uniqueMap.values());
  }

  intersection(set1, set2) {
    return set1.filter(item1 => 
      set2.some(item2 => this.compareItems(item1, item2))
    );
  }

  difference(set1, set2) {
    return set1.filter(item1 => 
      !set2.some(item2 => this.compareItems(item1, item2))
    );
  }
}

module.exports = SetsService; 
