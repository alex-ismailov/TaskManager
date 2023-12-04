FactoryBot.define do
  factory :user do
    id { 1 }
    first_name { 'MyString' }
    last_name { 'MyString' }
    password { 'MyString' }
    email { 'adam@adam.com' }
    avatar { 'MyString' }
    type { '' }

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
