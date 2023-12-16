FactoryBot.define do
  sequence :user, aliases: [:first_name, :last_name, :password, :avatar, :type] do |n|
    "user-string#{n}"
  end

  sequence :user_email do |n|
    "user#{n}@example.com"
  end

  sequence :task, aliases: [:name, :description] do |n|
    "task-string#{n}"
  end
end
