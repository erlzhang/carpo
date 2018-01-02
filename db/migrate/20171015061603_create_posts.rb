class CreatePosts < ActiveRecord::Migration[5.1]
  def change
    create_table :posts do |t|
      t.string :title, null: false, default: ""
      t.text :content
      t.integer :post_index, null: false, default: 0
      t.integer :status, null: false, default: 0
      t.references :book
      t.references :volume

      t.timestamps
    end
  end
end
