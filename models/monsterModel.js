const mongoose = require("mongoose")

const monsterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "missing name"],
    unique: true
  },
  size: {
    type: String,
    default: ""
  },
  type: {
    type: String,
    default: ""
  },
  alignment: {
    type: String,
    default: ""
  },
  armor_class: {
    type: {
      type: [String]
    },
    value: Number
  },
  hit_points: {
    type: Number
  },
  hit_points_dice: {
    type: String
  },
  speed: {
    value: Number
  },
  str: [Number],
  dex: [Number],
  con: [Number],
  int: [Number],
  wis: [Number],
  saving_throws: {},
  skills: {},
  damage_resistances: [String],
  damage_immunities: [String],
  condition_immunities: [String],
  senses: {},
  languages: [String],
  challenge: {
    range: [Number],
    exp: Number
  }
})

const Monster = mongoose.model("Monster", monsterSchema)

module.exports = Monster
