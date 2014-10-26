class AddTimestampsToLists < ActiveRecord::Migration
  def change
    add_column(:lists, :created_at, :datetime)
    add_column(:lists, :updated_at, :datetime)
  end
end

