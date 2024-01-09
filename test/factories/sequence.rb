FactoryBot.define do
  sequence :user_data, aliases: [:first_name, :last_name, :password, :avatar, :type] do |n|
    "user-string#{n}"
  end

  sequence :email_data, aliases: [:email] do |n|
    "user#{n}@example.com"
  end

  sequence :task_data, aliases: [:name, :description] do |n|
    "task-string#{n}"
  end
end
