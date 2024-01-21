FactoryBot.define do
  factory :task do
    name
    description
    author
    assignee
    expired_at { Date.current + 7.days }
  end
end
