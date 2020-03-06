class APIFeatures {
  constructor(query, queryString) {
    this.query = query
    this.queryString = queryString
  }

  filter() {
    // passing in req.query will apply filter, however we want to
    // exclude certain fields for pagination, sorting, limiting, etc...
    const queryObj = { ...this.queryString }
    const excludedFields = ["page", "sort", "limit", "fields"]
    excludedFields.forEach(e => delete queryObj[e])

    // advanced filtering for [gte, gt, lte, lt]
    let queryStr = JSON.stringify(queryObj)
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)
    this.query = this.query.find(JSON.parse(queryStr))
    return this
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ")
      this.query = this.query.sort(sortBy)
    } else {
      // default sort
      this.query = this.query.sort("name")
    }
    return this
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ")
      this.query = this.query.select(fields)
    } else {
      // - = exclude
      this.query = this.query.select("-__v")
    }
    return this
  }

  paginate() {
    // n * 1 converts String to Integer
    const page = this.queryString.page * 1 || 1
    const limit = this.queryString.limit * 1 || 100
    const skip = (page - 1) * limit
    // page=3&limit=10, 1-10, page 1, 11-20, page 2...
    this.query = this.query.skip(skip).limit(limit)
    return this
  }
}

module.exports = APIFeatures
