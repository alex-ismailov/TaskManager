FactoryBot.define do
  factory :task do
    name
    description
    author
    assignee
    state { :new_task }
    expired_at { Date.current + 7.days }
  end
end
