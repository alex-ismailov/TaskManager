FactoryBot.define do
  factory :task do
    name
    description
    author
    assignee
    state { 'MyString' }
    expired_at { Date.current + 7.days }
  end
end
