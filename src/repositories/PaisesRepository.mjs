import CountryModel from "../models/CountryModel.mjs";
import IRepository from "./IRepository.mjs";

class PaisesRepository extends IRepository {

  async crear(pais) {
    return await CountryModel.create(pais);
  }

  async actualizar(id, pais) {
    return await CountryModel.findByIdAndUpdate(id, pais);
  }

  async deleteById(id) {
    return await CountryModel.findByIdAndDelete(id);
  }

  async deleteByName(nombre) {
    return await CountryModel.findOneAndDelete({ 'name.official': nombre });
  }

  async obtenerPorId(id) {
    return await CountryModel.findById(id);
  }

  async obtenerTodos() {
    return await CountryModel.find({});
  }
}

export default PaisesRepository;