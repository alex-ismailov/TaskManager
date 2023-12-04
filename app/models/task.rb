class Task < ApplicationRecord
  belongs_to :author, class_name: 'User'
  belongs_to :assignee, class_name: 'User', optional: true
 
  validates :name, :author, :description, presence: true
  validates :description, length: { maximum: 500 }
end
