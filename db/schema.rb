# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20171022104517) do

  create_table "authors", force: :cascade do |t|
    t.string "name", default: "", null: false
    t.string "email", default: "", null: false
    t.text "description"
    t.integer "role", default: 0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "password_digest"
    t.string "remember_digest"
    t.index ["email"], name: "index_authors_on_email", unique: true
  end

  create_table "books", force: :cascade do |t|
    t.string "title", default: "", null: false
    t.text "description"
    t.integer "status", default: 0, null: false
    t.integer "openess", default: 0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "default_volume", default: 0, null: false
    t.integer "current_post_index", default: 0, null: false
    t.integer "current_volume_index", default: 0, null: false
    t.integer "author_id"
  end

  create_table "posts", force: :cascade do |t|
    t.string "title", default: "", null: false
    t.text "content"
    t.integer "post_index", default: 0, null: false
    t.integer "book_id"
    t.integer "volume_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "status", default: 0, null: false
    t.index ["book_id"], name: "index_posts_on_book_id"
    t.index ["volume_id"], name: "index_posts_on_volume_id"
  end

  create_table "volumes", force: :cascade do |t|
    t.string "title", default: "", null: false
    t.text "description"
    t.integer "volume_index", default: 0, null: false
    t.integer "book_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["book_id"], name: "index_volumes_on_book_id"
  end

end
