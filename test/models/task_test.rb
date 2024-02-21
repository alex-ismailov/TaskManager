require 'test_helper'

class TaskTest < ActiveSupport::TestCase
  test 'create' do
    user = create(:user)
    task = create(:task, author: user, assignee: user)
    assert task.persisted?
  end
end
