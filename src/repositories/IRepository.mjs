class IRepository {
  obtenerPorId(id) {
    throw new Error('Método "ObtenerPorId()" no implementado');
  }
  obtenerTodos() {
    throw new Error('Método "ObtenerTodos()" no implementado');
  }
  buscarPorAtributo(atributo, valor) {
    throw new Error('Método "BuscarPorAtributo()" no implementado');
  }
  obtenerMayoresDe30() {
    throw new Error('Método "ObtenerMayoresDe30()" no implementado');
  }
}

export default IRepository;