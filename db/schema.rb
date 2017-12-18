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

ActiveRecord::Schema.define(version: 20171217042422) do

  create_table "authors", force: :cascade do |t|
    t.string "name", default: "", null: false
    t.text "introduction"
    t.string "url", default: "", null: false
    t.string "file_avatar"
    t.datetime "birthday"
    t.integer "status", default: 0, null: false
    t.integer "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "avatar_id", default: 0, null: false
    t.index ["user_id"], name: "index_authors_on_user_id"
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

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
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
