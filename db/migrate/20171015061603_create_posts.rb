class CreatePosts < ActiveRecord::Migration[5.1]
  def change
    create_table :posts do |t|
      t.string :title, null: false, default: ""
      t.text :content
      t.integer :number, null: false, default: 0
      t.integer :volume_id
      t.integer :book_id

      t.timestamps
    end
  end
end
