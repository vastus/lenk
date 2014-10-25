class CreateLists < ActiveRecord::Migration
  def change
    create_table(:lists) do |t|
      t.string(:name, {
        :null => false,
        :default => "unnamed",
        :unique => true,
        :limit => 128
      })
    end
  end
end

