PLAN_FILE=gallery.plan

LOG_LEVEL=''
TF=terraform

main: plan

plan:
	@TF_LOG=$(LOG_LEVEL) $(TF) plan -out $(PLAN_FILE)

apply:
	@$(TF) apply -auto-approve $(PLAN_FILE)

show:
	$(TF) show

refresh:
	$(TF) refresh

validate:
	$(TF) validate

clean:
	rm $(PLAN_FILE)

lint:
	tflint

init:
	$(TF) init -upgrade

.terraform: provider.tf
	$(TF) init

.PHONY: plan
