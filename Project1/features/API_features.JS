class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    // Filtro avançado
    let resultadoDaQuery = JSON.stringify(queryObj);
    resultadoDaQuery = resultadoDaQuery.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );
    // Buscando consoate a query
    this.query = this.query.find(JSON.parse(resultadoDaQuery));

    return this;
  }

  // Sortea os dados da api do mais caro ou mais
  sorting() {
    if (this.queryString.sort) {
      // Como fazer um sort by
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      //  Caso o cliente nao tenha sorteado
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  // Responsavel por excluir ou incluir que tipo de detalhe o cliente quer
  fields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      // Seleciona valores especificos que vem do eq.query.fields
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }

    return this;
  }

  //  Limites de dados

  pagination() {
    const page = this.queryString * 1 || 1;
    const limit = this.queryString * 1 || 10;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = ApiFeatures;
