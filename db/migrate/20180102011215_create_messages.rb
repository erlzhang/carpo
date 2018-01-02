class CreateMessages < ActiveRecord::Migration[5.1]
  def change
    create_table :messages do |t|
      t.integer :type, null: false, default: 0
      t.string :title, null: false, default: ""
      t.text :content
      t.integer :recipient, null: false, default: 0
      t.integer :sender, null: false, default: 0
      t.integer :reply_to, null: false, default: 0

      t.timestamps
    end
  end
end
