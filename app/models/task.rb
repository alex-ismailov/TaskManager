class Task < ApplicationRecord
  belongs_to :author, class_name: 'User'
  belongs_to :assignee, class_name: 'User', optional: true

  validates :name, :author, :description, presence: true
  validates :description, length: { maximum: 500 }

  state_machine initial: :new_task do
    event :move_to_development do
      transition [:new_task, :in_qa, :in_code_review] => :in_development
    end

    event :archive do
      transition [:new_task, :released] => :archived
    end

    event :move_to_qa do
      transition in_development: :in_qa
    end

    event :move_to_code_review do
      transition in_qa: :in_code_review
    end

    event :move_to_ready_for_release do
      transition in_code_review: :ready_for_release
    end

    event :release do
      transition ready_for_release: :released
    end
  end
end
