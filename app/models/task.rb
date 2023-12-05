class Task < ApplicationRecord
  belongs_to :author, class_name: 'User'
  belongs_to :assignee, class_name: 'User', optional: true
 
  validates :name, :author, :description, presence: true
  validates :description, length: { maximum: 500 }

  state_machine :initial => :new_task do
    event :move_to_development do
      transition :new_task => :in_development
    end

    event :archive_new_task do
      transition :new_task => :archived
    end
  
    event :move_from_development_to_qa do
      transition :in_development => :in_qa
    end
  
    event :move_from_qa_to_development do
      transition :in_qa => :in_development
    end

    event :move_from_qa_to_code_review do
      transition :in_qa => :in_code_review
    end
  
    event :move_from_code_review_to_development do
      transition :in_code_review => :in_development
    end

    event :move_from_code_review_to_ready_for_release do
      transition :in_code_review => :ready_for_release
    end
  
    event :release do
      transition :ready_for_release => :released
    end
  
    event :archive_after_release do
      transition :released => :archived
    end
  end
end
