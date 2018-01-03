class CreateComments < ActiveRecord::Migration[5.1]
  def change
    create_table :comments do |t|
      t.string :name, null: false, default: ""
      t.string :email, null: false, default: ""
      t.text :content
      t.integer :reply_to, null: false, default: 0
      t.references :book

      t.timestamps
    end
  end
end
