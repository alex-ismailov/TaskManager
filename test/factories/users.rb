FactoryBot.define do
  factory :user do
    id { 1 }
    first_name { generate(:user) }
    last_name { generate(:user) }
    password { generate(:user) }
    email { generate(:user_email) }
    avatar { generate(:user) }
    type { generate(:user) }

    factory :developer do
      type { 'Developer' }
    end

    factory :manager do
      type { 'Manager' }
    end

    factory :admin do
      type { 'Admin' }
    end
  end
end
