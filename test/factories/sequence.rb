FactoryBot.define do
  sequence :user_data, aliases: [:first_name, :last_name, :password, :avatar] do |n|
    "user-string#{n}"
  end

  sequence :type_data, aliases: [:type] do
    'Admin'
  end

  sequence :email_data, aliases: [:email] do |n|
    "user#{n}@example.com"
  end

  sequence :task_data, aliases: [:name, :description] do |n|
    "task-string#{n}"
  end
end
