class CreateFollows < ActiveRecord::Migration[5.1]
  def change
    create_table :follows do |t|
      t.integer :from, null: false, default: 0
      t.integer :to, null: false, default: 0

      t.timestamps
    end
  end
end
