class CreateBooks < ActiveRecord::Migration[5.1]
  def change
    create_table :books do |t|
      t.string :title, null: false, default: ""
      t.string :slug, null: false, default: ""
      t.text :description
      t.integer :type, null: false, default: 0
      t.integer :template, null: false, default: 0
      t.integer :status, null: false, default: 0
      t.integer :openess, null:false, default: 0
      t.integer :current_post_index, null: false, default: 0
      t.integer :current_volume_index, null: false, default: 0
      t.string :file_cover
      t.references :author

      t.timestamps
    end
  end
end
