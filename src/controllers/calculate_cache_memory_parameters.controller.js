class CalculateCacheMemoryParametersController {
  constructor() {
    this.handle = this.handle.bind(this);
  }

  handle(request, h) {
    try {
      const { ram_capacity, data_bus_width, words_in_line, cache_divider, k } =
        request.payload;
      const result = this.calculateCacheMemoryParameters(
        ram_capacity,
        data_bus_width,
        words_in_line,
        cache_divider,
        k
      );

      return h.response(result).code(200);
    } catch (error) {
      return h
        .response({
          message: error.message || "Something went wrong",
        })
        .code(400);
    }
  }

  calculateCacheMemoryParameters(
    ram_capacity,
    data_bus_width,
    words_in_line,
    cache_divider,
    k
  ) {
    const addressBusWidth = this.address_bus_width(ram_capacity);
    const offset = this.offset(words_in_line);

    const setK1 = this.setK_1(
      this.cache_memory_size(ram_capacity, cache_divider),
      this.cache_line_size(words_in_line, data_bus_width)
    );
    const setK = this.setK(setK1, k);
    return {
      k_1: {
        tag: this.tag(addressBusWidth, offset, setK1),
        set: setK1,
        offset: offset,
      },
      k: {
        tag: this.tag(addressBusWidth, offset, setK),
        set: setK,
        offset: offset,
      },
      k_lines: {
        tag: this.tag(addressBusWidth, offset, 0),
        set: 0,
        offset: offset,
      },
    };
  }

  cache_memory_size(ram_capacity, cache_divider) {
    return (ram_capacity * 2 ** 30) / cache_divider;
  }

  address_bus_width(ram_capacity) {
    return Math.log2(ram_capacity * 2 ** 30);
  }

  offset(words_in_line) {
    return Math.log2(words_in_line);
  }

  cache_line_size(words_in_line, data_bus_width) {
    return words_in_line * data_bus_width / 8;
  }

  setK_1(cache_memory_size, cache_line_size) {
    return Math.log2(cache_memory_size / cache_line_size);
  }

  setK(setK1, k) {
    return setK1 - Math.log2(k);
  }

  tag(address_bus_width, offset, set) {
    return address_bus_width - offset - set;
  }
}

module.exports = CalculateCacheMemoryParametersController;
