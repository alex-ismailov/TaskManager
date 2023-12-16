FactoryBot.define do
  factory :task do
    name { generate(:task) }
    description { generate(:task) }
    author { association :user }
    assignee { association :user }
    state { 'MyString' }
    expired_at { Date.current.to_formatted_s(:db) }
  end
end
